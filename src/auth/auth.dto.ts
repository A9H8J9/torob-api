import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}

export class VerifyCodeDto extends SendCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
}
