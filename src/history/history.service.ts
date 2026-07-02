import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateViewDto } from './history.dto';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async all(user_id: number) {
    return await this.prisma.productView.findMany({
      where: {
        user_id,
      },
      include: {
        product: {
          include: {
            productImages: true,
          },
        },
      },
    });
  }

  async createView(user_id: number, { product_id }: CreateViewDto) {
    await this.prisma.productView.upsert({
      where: {
        product_id_user_id: {
          product_id,
          user_id,
        },
      },
      create: {
        product_id,
        user_id,
      },
      update: {},
    });
    return { status: 200 };
  }

  async allRemove(user_id: number) {
    await this.prisma.productView.deleteMany({
      where: {
        user_id,
      },
    });
    return { status: 200 };
  }
}
