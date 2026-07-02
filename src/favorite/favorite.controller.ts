import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateFavoriteDto } from './favorite.dto';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get('')
  async all(@Req() request) {
    return await this.favoriteService.all(request.user.userId);
  }

  @Post('toggle')
  async toggle(@Req() request, @Body() data: CreateFavoriteDto) {
    return await this.favoriteService.toggle(request.user.userId, data);
  }
}
