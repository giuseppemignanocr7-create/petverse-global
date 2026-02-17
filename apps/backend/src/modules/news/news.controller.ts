import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('news')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('articles')
  @ApiOperation({ summary: 'Get news articles' })
  async getArticles(
    @Query('category') category?: string,
    @Query('species') species?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.newsService.getArticles({ category, species, search, limit, offset });
  }

  @Get('articles/:id')
  @ApiOperation({ summary: 'Get article by ID' })
  async getArticle(@Param('id') id: string) {
    return this.newsService.getArticle(id);
  }

  @Post('articles/:id/view')
  @ApiOperation({ summary: 'Track article view' })
  async trackView(@Param('id') id: string) {
    return this.newsService.trackView(id);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get news categories' })
  async getCategories() {
    return this.newsService.getCategories();
  }
}
