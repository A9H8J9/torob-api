import { Controller, Get, Post } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async all() {}

  @Get('options')
  async getReportOptions() {}

  @Post()
  async create() {}
}
