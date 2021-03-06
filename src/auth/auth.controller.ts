import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { SignupSerializer } from './serializer/signup.serializer';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

   constructor(private readonly authService: AuthService) {}
   
   @UseInterceptors(ClassSerializerInterceptor)
   @ApiCreatedResponse({description: 'User registration'})
   @ApiBody({type: SignupDto})
   @Post('signup')
   @HttpCode(200)
   async signup(@Req() req, @Body() signupDto: SignupDto ): Promise<SignupSerializer> {
      try {
          return this.authService.signup(req, signupDto);

      } catch(err) {
         return err;
      }
   }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({description: 'User login'})
  @ApiBody({type: LoginDto})
  @ApiUnauthorizedResponse({description: 'Invalid credentials'})
  async login(@Req() req, @Body() loginDto: LoginDto) {
    return await this.authService.login(req, loginDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Req() req) {
  //   return req.user;
  // }

}
