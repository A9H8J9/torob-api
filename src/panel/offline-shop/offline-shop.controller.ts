import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OfflineShopService } from './offline-shop.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ChangeBlockStatusDto, CreateLocationDto } from './offline-shop.dto';

@UseGuards(JwtAuthGuard)
@Controller('panel/offline-shop')
export class OfflineShopController {
  constructor(private offlineShopService: OfflineShopService) {}

  @Get(':shop_id/status')
  async getStatus(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getStatus(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/active-status')
  async getActiveStatus(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getActiveStatus(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/working-hours')
  async getWorkingHours(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getWorkingHours(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/location')
  async getLocation(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getLocation(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/owner-info')
  async getOwnerInfo(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getOwnerInfo(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/categories')
  async getCategories() {}

  @Get(':shop_id/images')
  async getImages(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getImages(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/business-type')
  async getBusinessType(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getBusinessType(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/contact-info')
  async getContactInfo(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getContactInfo(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/info')
  async getInfo(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getInfo(shop_id, request.user.userId);
  }

  @Get(':shop_id/certificate/national-card')
  async getNationalCard(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getNationalCard(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/certificate/address')
  async getAddressVerification(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getAddressVerification(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/certificate/video')
  async getVerificationVideo(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getVerificationVideo(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/certificate/:type')
  async getBusinessLicense(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
    @Param('type') type: string,
  ) {
    return await this.offlineShopService.getBusinessLicense(
      shop_id,
      type,
      request.user.userId,
    );
  }

  @Get(':shop_id/instagram-username')
  async getInstagramUserName(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getInstagramUserName(
      shop_id,
      request.user.userId,
    );
  }

  @Get(':shop_id/permissions')
  async getPermissions(
    @Req() request,
    @Param('shop_id', ParseIntPipe) shop_id: number,
  ) {
    return await this.offlineShopService.getPermissions(
      shop_id,
      request.user.userId,
    );
  }

  @Get('my-shops')
  async myShops(@Req() request) {
    return await this.offlineShopService.myShops(request.user.userId);
  }

  @Post('active-status')
  async changeActiveStatus(@Req() request, @Body() data: ChangeBlockStatusDto) {
    return await this.offlineShopService.changeActiveStatus(
      data,
      request.user.userId,
    );
  }

  @Post('working-hours')
  async createWorkingHours() {}

  @Post('location')
  async createLocation(@Req() request, @Body() data: CreateLocationDto) {
    return await this.offlineShopService.createLocation(
      request.user.userId,
      data,
    );
  }

  @Post('owner-info')
  async createOwnerInfo(@Req() request) {}

  @Post('images')
  async createImage() {}
}
