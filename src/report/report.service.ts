import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './report.dto';
import { ShopType } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  private buildTree(items) {
    const map = new Map<number, any>();
    const roots: any[] = [];

    for (const item of items) {
      map.set(item.id, { ...item, children: [] });
    }

    for (const item of items) {
      const node = map.get(item.id);

      if (item.parent_id) {
        map.get(item.parent_id)?.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  async all(user_id: number) {
    return this.prisma.report.findMany({
      where: {
        user_id,
      },
      include: {
        shop: true,
        product: true,
        reportReason: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async options(shop_type: ShopType) {
    const reasons = await this.prisma.reportReason.findMany({
      where: { shop_type },
      orderBy: { id: 'asc' },
    });

    return this.buildTree(reasons);
  }

  async create(user_id: number, { product_id, report_reason_id, shop_id, description }: CreateReportDto) {
    const reason = await this.prisma.reportReason.findUnique({
      where: { id: report_reason_id },
    });

    if (!reason) {
      throw new NotFoundException('report reason not found');
    }

    const offer = await this.prisma.offer.findFirst({
      where: {
        shop_id,
        product_id,
        is_active: true,
      },
      include: {
        shop: {
          select: {
            type: true,
          },
        },
      },
      orderBy: {
        price: 'asc',
      },
    });

    if (!offer) {
      throw new NotFoundException('offer not found');
    }
    if (offer.shop.type !== reason.shop_type) {
      throw new BadRequestException('shop type bad');
    }

    if (reason.needs_description && !description) {
      throw new BadRequestException('description required');
    }

    const report = await this.prisma.report.create({
      data: {
        user_id,
        shop_id,
        product_id,
        report_reason_id,
        description,
        price_at_report_time: Number(offer.price),
      },
    });

    return { status: 200 };
  }
}
