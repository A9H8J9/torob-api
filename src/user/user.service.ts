import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSelectCity } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(user_id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: user_id,
        is_active: true,
      },
    });
  }

  async listFavorites(user_id: number) {
    const favorites = await this.prisma.favorite.findMany({
      where: { user_id },
      select: {
        product_id: true,
      },
    });
    return favorites;
  }

  async selectCity({ city_id }: UserSelectCity, user_id: number) {
    await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        city_id,
      },
    });
    return { status: 200 };
  }
}
