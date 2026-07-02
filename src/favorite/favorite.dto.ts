import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  product_id: number;
}
