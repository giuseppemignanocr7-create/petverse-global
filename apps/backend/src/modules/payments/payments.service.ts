import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY', ''),
      { apiVersion: '2023-10-16' as any },
    );
  }

  async getPlans() {
    return [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
          'Fino a 2 pet',
          'Diario base',
          'Calendario vaccini',
          'Community accesso base',
        ],
      },
      {
        id: 'premium_monthly',
        name: 'Premium Mensile',
        price: 4.99,
        interval: 'month',
        features: [
          'Pet illimitati',
          'AI Coach completo',
          'VetBridge',
          'Storybook PDF',
          'Marketplace sconti',
          'Nessuna pubblicità',
        ],
      },
      {
        id: 'premium_yearly',
        name: 'Premium Annuale',
        price: 39.99,
        interval: 'year',
        features: [
          'Tutto Premium Mensile',
          '2 mesi gratis',
          'Supporto prioritario',
        ],
      },
    ];
  }

  async createSubscription(userId: string, plan: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('User not found');

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.fullName || undefined,
        metadata: { userId: user.id },
      });
      customerId = customer.id;

      await this.prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const priceId =
      plan === 'premium_monthly'
        ? this.configService.get('STRIPE_PRICE_PREMIUM_MONTHLY')
        : this.configService.get('STRIPE_PRICE_PREMIUM_YEARLY');

    if (!priceId) {
      throw new BadRequestException('Invalid plan');
    }

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    await this.prisma.subscription.create({
      data: {
        userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customerId,
        plan,
        status: subscription.status,
        currentPeriodStart: new Date(
          subscription.current_period_start * 1000,
        ),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'premium',
        subscriptionStatus: subscription.status,
      },
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent
        ?.client_secret,
    };
  }

  async cancelSubscription(userId: string) {
    const sub = await this.prisma.subscription.findFirst({
      where: { userId, status: { in: ['active', 'trialing'] } },
    });

    if (!sub) throw new BadRequestException('No active subscription');

    await this.stripe.subscriptions.update(sub.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    await this.prisma.subscription.update({
      where: { id: sub.id },
      data: {
        cancelAtPeriodEnd: true,
        cancelledAt: new Date(),
      },
    });

    return { message: 'Subscription will cancel at period end' };
  }

  async getCustomerPortalUrl(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.stripeCustomerId) {
      throw new BadRequestException('No Stripe customer found');
    }

    const session = await this.stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: this.configService.get('FRONTEND_URL', 'http://localhost:8080'),
    });

    return { url: session.url };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret || '',
      );
    } catch {
      throw new BadRequestException('Webhook signature verification failed');
    }

    switch (event.type) {
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await this.prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(
              subscription.current_period_end * 1000,
            ),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await this.prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: 'canceled' },
        });
        // Downgrade user
        const sub = await this.prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (sub) {
          await this.prisma.user.update({
            where: { id: sub.userId },
            data: {
              subscriptionTier: 'free',
              subscriptionStatus: 'canceled',
            },
          });
        }
        break;
      }
    }

    return { received: true };
  }
}
