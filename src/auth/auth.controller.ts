import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendCodeDto, VerifyCodeDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-code')
  async sendCode(@Body() data: SendCodeDto) {
    return await this.authService.sendCode(data);
  }

  @Post('verify-code')
  async verifyCode(@Body() data: VerifyCodeDto) {
    return await this.authService.verifyCode(data);
  }
}
