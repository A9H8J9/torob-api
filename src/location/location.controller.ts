import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('/province')
  async province() {}

  @Get('/cities/:city_id')
  async city() {}

  @Get('/cities/most-visited')
  async mostVisited() {}
}
