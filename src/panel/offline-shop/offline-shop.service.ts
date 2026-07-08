import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChangeBlockStatusDto,
  ChangeBlockStatusEnum,
  CreateLocationDto,
} from './offline-shop.dto';
import { DayOfWeek, Prisma, VerificationSection } from '@prisma/client';

@Injectable()
export class OfflineShopService {
  constructor(private prisma: PrismaService) {}

  private async getShopMember(
    shop_id: number,
    user_id: number,
    select?: Prisma.ShopSelect,
  ) {
    const shop = await this.prisma.shop.findUnique({
      where: {
        id: shop_id,
      },
      select: {
        ...select,
        shopMembers: {
          where: {
            user_id,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!shop) {
      throw new NotFoundException('shop not found');
    }

    if (!shop.shopMembers.length) {
      throw new ForbiddenException('you are not a member of this shop');
    }

    return shop;
  }

  async getStatus(shop_id: number, user_id: number) {
    const shop = await this.getShopMember(shop_id, user_id, {
      shopVerifications: {
        select: {
          section: true,
          status: true,
        },
      },
    });

    const verificationMap = new Map(
      shop.shopVerifications.map((item) => [
        item.section,
        item.status.toLowerCase(),
      ]),
    );

    const result = Object.values(VerificationSection).reduce((acc, section) => {
      acc[`${section.toLowerCase()}_status`] =
        verificationMap.get(section) ?? 'pending_filling';

      return acc;
    }, {});

    return {
      name: shop.shop_name,
      ...result,
    };
  }

  async getActiveStatus(shop_id: number, user_id: number) {
    const shop = await this.getShopMember(shop_id, user_id);
    return { status: shop.is_active };
  }

  async changeActiveStatus(
    { new_status, shop_id }: ChangeBlockStatusDto,
    user_id: number,
  ) {
    const shop = await this.getShopMember(shop_id, user_id);

    await this.prisma.shop.update({
      where: {
        id: shop.id,
      },
      data: {
        is_active: new_status === ChangeBlockStatusEnum.active ? true : false,
      },
    });
    return {
      status: new_status === ChangeBlockStatusEnum.active ? true : false,
    };
  }

  async getWorkingHours(shop_id: number, user_id: number) {
    const shop = await this.getShopMember(shop_id, user_id, {
      shopWorkingHours: {
        select: {
          day: true,
          shift_number: true,
          start_time: true,
          end_time: true,
        },
      },
    });

    const workingHourMap = new Map(
      shop.shopWorkingHours.map((item) => [
        `${item.day}_${item.shift_number}`,
        {
          start_time: item.start_time.toISOString().substring(11, 19),
          end_time: item.end_time.toISOString().substring(11, 19),
        },
      ]),
    );

    const dailyWorkingHours = Object.values(DayOfWeek).reduce((acc, day) => {
      acc[day.toLowerCase()] = {
        shift1: workingHourMap.get(`${day}_1`) ?? {
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        shift2: workingHourMap.get(`${day}_2`) ?? {
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
      };

      return acc;
    }, {});

    return {
      daily_working_hours: dailyWorkingHours,
    };
  }

  async getLocation(shop_id: number, user_id: number) {
    const shop = await this.getShopMember(shop_id, user_id, {
      address: true,
      latitude: true,
      longitude: true,
      province: {
        select: {
          name: true,
        },
      },
      city: {
        select: {
          name: true,
        },
      },
    });

    return {
      address: shop.address,
      latitude: shop.latitude,
      longitude: shop.longitude,
      province: shop.province?.name,
      city: shop.city?.name,
    };
  }

  async createLocation(
    user_id: number,
    {
      address,
      city_id,
      latitude,
      longitude,
      province_id,
      shop_id,
    }: CreateLocationDto,
  ) {
    const shop = await this.getShopMember(shop_id, user_id, {
      id: true,
      address: true,
      latitude: true,
      longitude: true,
    });

    if (shop.address || shop.latitude || shop.longitude) {
      throw new BadRequestException('shop location already exists');
    }

    await this.prisma.shop.update({
      where: {
        id: shop_id,
      },
      data: {
        address,
        latitude,
        longitude,
        province_id,
        city_id,
      },
    });

    return { status: 200 };
  }

  async getOwnerInfo(shop_id: number, user_id: number) {
    const shop = await this.getShopMember(shop_id, user_id, {
      owner: {
        select: {
          national_code: true,
          first_name: true,
          last_name: true,
          birth_date: true,
          mobile_phone: true,
        },
      },
    });
    return shop.owner;
  }

  async getBusinessType(shop_id: number, user_id: number) {
    const shop = await this.getShopMember(shop_id, user_id, {
      businessType: {
        select: {
          value: true,
        },
      },
    });
    const business = await this.prisma.business.findMany({
      select: {
        value: true,
        label: true,
      },
    });
    return {
      business_types: business,
      selected_business_type: shop.businessType?.value,
    };
  }

  async info(shop_id: number, user_id: number) {
    const shop = await this.getShopMember(shop_id, user_id, {
      shop_name: true,
      shop_logo: true,
    });
    return shop;
  }

  async myShops(user_id: number) {
    const shops = await this.prisma.shopMember.findMany({
      where: {
        user_id,
      },
      select: {
        is_owner: true,
        is_admin: true,
        shop: {
          select: {
            shop_name: true,
            domain: true,
            shop_logo: true,
          },
        },
      },
    });

    return {
      shops: shops.map((item) => {
        const access: string[] = [];

        if (item.is_owner) {
          access.push('صاحب امتیاز');
        }

        if (item.is_admin) {
          access.push('ادمین');
        }

        return {
          access,
          name: item.shop.shop_name,
          domain: item.shop.domain,
          logo: item.shop.shop_logo,
        };
      }),
    };
  }
}
