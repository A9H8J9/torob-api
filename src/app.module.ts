import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { ReportModule } from './report/report.module';
import { LocationModule } from './location/location.module';
import { SearchModule } from './search/search.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PanelModule } from './panel/panel.module';

@Module({
  imports: [
    AuthModule,
    FavoriteModule,
    ShopModule,
    CategoryModule,
    TicketModule,
    UserModule,
    HistoryModule,
    ReportModule,
    LocationModule,
    SearchModule,
    ProductModule,
    PrismaModule,
    AnalyticsModule,
    PanelModule,
  ],
})
export class AppModule {}
