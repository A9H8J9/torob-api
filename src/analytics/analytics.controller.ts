import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateAnalyticsDto, RemoveAnalyticsDto } from './analytics.dto';

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get()
  async all(@Req() request) {
    return await this.analyticsService.all(request.user.userId);
  }

  @Post()
  async create(@Req() request, @Body() data: CreateAnalyticsDto) {
    return await this.analyticsService.create(request.user.userId, data);
  }

  @Delete()
  async remove(@Req() request, @Body() data: RemoveAnalyticsDto) {
    return await this.analyticsService.remove(request.user.userId, data);
  }
}
