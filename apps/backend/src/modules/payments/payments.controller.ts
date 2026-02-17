import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Request } from 'express';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Get subscription plans' })
  async getPlans() {
    return this.paymentsService.getPlans();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  @ApiOperation({ summary: 'Create subscription' })
  async subscribe(
    @CurrentUser('id') userId: string,
    @Body('plan') plan: string,
  ) {
    return this.paymentsService.createSubscription(userId, plan);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancel(@CurrentUser('id') userId: string) {
    return this.paymentsService.cancelSubscription(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('portal')
  @ApiOperation({ summary: 'Get Stripe Customer Portal URL' })
  async getPortal(@CurrentUser('id') userId: string) {
    return this.paymentsService.getCustomerPortalUrl(userId);
  }

  @Public()
  @Post('webhook')
  @ApiOperation({ summary: 'Stripe webhook handler' })
  async handleWebhook(@Req() req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'] as string;
    return this.paymentsService.handleWebhook(req.rawBody!, signature);
  }
}
