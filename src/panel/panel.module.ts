import { Module } from '@nestjs/common';
import { OfflineShopController } from './offline-shop/offline-shop.controller';
import { OfflineShopService } from './offline-shop/offline-shop.service';
import { OnlineShopService } from './online-shop/online-shop.service';
import { OnlineShopController } from './online-shop/online-shop.controller';

@Module({
  controllers: [OfflineShopController, OnlineShopController],
  providers: [OfflineShopService, OnlineShopService],
})
export class PanelModule {}
