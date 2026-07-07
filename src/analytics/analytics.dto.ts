import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnalyticsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  variant_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  watch_price: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  watch_availability: boolean;
}

export class RemoveAnalyticsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  variant_id: number;
}
