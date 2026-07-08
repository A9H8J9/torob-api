import { Controller } from '@nestjs/common';
import { OnlineShopService } from './online-shop.service';

@Controller('panel/online-shop')
export class OnlineShopController {
  constructor(private onlineShopService: OnlineShopService) {}
}
