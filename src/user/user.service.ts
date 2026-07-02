import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
