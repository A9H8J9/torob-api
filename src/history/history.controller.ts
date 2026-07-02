import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateViewDto } from './history.dto';

@UseGuards(JwtAuthGuard)
@Controller('histories')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async all(@Req() request) {
    return await this.historyService.all(request.user.userId);
  }

  @Post()
  async createView(@Req() request, @Body() data: CreateViewDto) {
    return await this.historyService.createView(request.user.userId, data);
  }

  @Delete()
  async allRemove(@Req() request) {
    return await this.historyService.allRemove(request.user.userId);
  }
}
