import { Body, Controller, Get, ParseBoolPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateFavoriteDto } from './favorite.dto';

@UseGuards(JwtAuthGuard)
@Controller('users/me/favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async all(@Req() request, @Query('only_ids', ParseBoolPipe) only_ids: boolean) {
    return await this.favoriteService.all(request.user.userId, only_ids);
  }

  @Post('toggle')
  async toggle(@Req() request, @Body() data: CreateFavoriteDto) {
    return await this.favoriteService.toggle(request.user.userId, data);
  }
}
