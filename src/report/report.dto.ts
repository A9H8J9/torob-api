import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  shop_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  report_reason_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
