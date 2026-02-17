import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MarketplaceService } from './marketplace.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('marketplace')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get marketplace products' })
  async getProducts(
    @Query('category') category?: string,
    @Query('species') species?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('search') search?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('sortBy') sortBy?: string,
  ) {
    return this.marketplaceService.getProducts({
      category, species, minPrice, maxPrice, search, limit, offset, sortBy,
    });
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  async getProduct(@Param('id') id: string) {
    return this.marketplaceService.getProduct(id);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get product categories' })
  async getCategories() {
    return this.marketplaceService.getCategories();
  }

  @Get('recommendations/:petId')
  @ApiOperation({ summary: 'Get AI product recommendations for pet' })
  async getRecommendations(@Param('petId') petId: string) {
    return this.marketplaceService.getRecommendations(petId);
  }

  @Get('cart')
  @ApiOperation({ summary: 'Get cart' })
  async getCart(@CurrentUser('id') userId: string) {
    return this.marketplaceService.getCart(userId);
  }

  @Post('cart/add')
  @ApiOperation({ summary: 'Add to cart' })
  async addToCart(
    @CurrentUser('id') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.marketplaceService.addToCart(userId, productId, quantity);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout' })
  async checkout(@CurrentUser('id') userId: string, @Body() dto: any) {
    return this.marketplaceService.createOrder(userId, dto);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get user orders' })
  async getOrders(@CurrentUser('id') userId: string) {
    return this.marketplaceService.getOrders(userId);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order by ID' })
  async getOrder(@Param('id') id: string) {
    return this.marketplaceService.getOrder(id);
  }
}
