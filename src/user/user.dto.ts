import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UserSelectCity {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  city_id: number;
}
