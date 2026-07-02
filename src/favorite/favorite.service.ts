import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async all(user_id: number) {
    return await this.prisma.favorite.findMany({
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

  async toggle(user_id: number, { product_id }: CreateFavoriteDto) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        user_id,
        product_id,
      },
    });
    if (favorite) {
      await this.prisma.favorite.delete({
        where: { id: favorite.id },
      });
      return { is_favorite: false };
    }
    await this.prisma.favorite.create({
      data: {
        user_id,
        product_id,
      },
    });
    return { is_favorite: true };
  }
}
