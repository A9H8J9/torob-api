import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export enum ChangeBlockStatusEnum {
  blocked = 'blocked',
  active = 'active',
}
export class ChangeBlockStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  shop_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ChangeBlockStatusEnum)
  new_status: ChangeBlockStatusEnum;
}

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  shop_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  longitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  province_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  city_id: number;
}
