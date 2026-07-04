import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async all(q: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const where = q
      ? {
          shop_name: {
            contains: q,
          },
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.shop.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      }),

      this.prisma.shop.count({
        where,
      }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async shopProducts(shop_id: number) {}
}
