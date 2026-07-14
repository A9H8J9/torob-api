import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum shopProductsSortEnum {
  popularity = 'popularity',
  price_asc = 'price_asc',
  price_desc = 'price_desc',
  new = 'new',
  top_seller = 'top_seller',
}

export class GetShopProductsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  shop_type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  stock_status: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;

  @ApiProperty({ enum: shopProductsSortEnum })
  @IsOptional()
  @IsEnum(shopProductsSortEnum)
  sort: shopProductsSortEnum = shopProductsSortEnum.popularity;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  price_gt?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  price_lt?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(20)
  limit: number = 20;
}
