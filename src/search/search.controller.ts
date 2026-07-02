import { Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('search')
  async search() {}

  @Get('search-by-image')
  async searcgByImage() {}

  @Get('search/autocomplete')
  async autocomplete() {}

  @Post('search/log')
  async log() {}
}
