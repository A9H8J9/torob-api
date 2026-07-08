import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OnlineShopService {
  constructor(private prisma: PrismaService) {}
}
