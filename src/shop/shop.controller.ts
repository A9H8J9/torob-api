import { Controller, Get, Post } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  async all() {}

  @Get(':shop_id/:slug')
  async get() {}

  @Get(':shop_id/:slug/products')
  async shopProducts() {}

  @Post()
  async create() {}
}
