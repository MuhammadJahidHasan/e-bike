import { ConflictException, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { EntityService } from 'src/entity/entity.service';
import { SignupDto } from './dto/signup.dto';
import { SignupSerializer } from './serializer/signup.serializer';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly entityService: EntityService,
                private readonly jwtService: JwtService ) {}

    async signup(@Req() req, signupDto: SignupDto): Promise<SignupSerializer> {
        await this.verifyUserEmail(signupDto.email);
        const hasPassword = await bcrypt.hash(signupDto.password, 10);
        const createUser = {
            ...signupDto,
            password: hasPassword
        }

        const newUser = await this.entityService.userRepo.save(createUser);

        return new SignupSerializer(newUser);
    }

    async login(@Req() req, loginDto: LoginDto): Promise<any> {
          
        const user = await this.validateUser(loginDto.email, loginDto.password);

        if(!user) {
            throw new UnauthorizedException();
        }

        return {
            access_token: this.jwtService.sign(user)
        }
     
    }

    private async verifyUserEmail(email: string): Promise<void> {
          const isUserExist = await this.entityService.userRepo.findOne({where: {email: email}});
          if(isUserExist) {
              throw new ConflictException('User is already exist');
          }
    }

    async validateUser(email: string, pass: string): Promise<any> {
          const user = await this.entityService.userRepo.findOne({email: email});
          const password = await bcrypt.compare(pass, user.password);
          if(user && password) {
              const {password, ...userData} = user;
              return userData; 
          }
          return null;
    }



}


