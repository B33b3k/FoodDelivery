import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ActivationDto, LoginInput, RegisterDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenSender } from './utils/sendToken';
import { PrismaService } from '../../../prisma/prisma.service';

interface UserData {
  email: string;
  password: string;
  name: string;
  phone_number: string,

}

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService, // corrected the typo
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    // Check if email already exists
    // const emailExists = await this.prismaService.user.findUnique({
    //   where: { email: registerDto.email },
    // });
    // if (emailExists) {
    //   return { message: 'Email already exists' };
    // }

    // // Check if phone number already exists
    // const phoneNumberExists = await this.prismaService.user.findUnique({
    //   where: { phone_number: registerDto.phone_number }, // corrected the query
    // });
    // if (phoneNumberExists) {
    //   return { message: 'Phone number already exists' };
    // }

    // Validate passwords
    const { name, email, password, address, confirmPassword, phone_number } = await registerDto;
    if (password !== confirmPassword) {
      return { message: 'Passwords do not match' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const Tokenuser = { email, password: hashedPassword, name, phone_number };

  

    // Send activation email
    const token = await this.createActivationToken(
      Tokenuser
    );
    const activationCode = token.activationCode;
    const activationToken= token.token;
    console.log('token', token);
    await this.emailService.sendEmail({
      email,
      subject: 'Account Activation',
     name,
activationCode
    });
      // Create user
  
    

    return {  activationToken };
  }

  // Create activation token
  async createActivationToken(user: 
    UserData

  ) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      { user, activationCode },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '5m',
      },
    );
    return {token,activationCode};
  }

  //activate user
  async activateUser(activationDto: ActivationDto, res: Response) {
    const { token,activationCode  } = activationDto;
   const user: { user: UserData; activationCode: string } =
     this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
        
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };


    if(user.activationCode!==activationCode){
      return {message: 'Invalid or expired token'}
    }

    const { email, password, name, phone_number } = user.user;
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existUser) {
      return { message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number,
      },
    });

    return { user: newUser,response: 'User created successfully' };

   



   
    

  }


async loginUser(
  email: string,
  password: string,
): Promise<any> {
  // Find user by email
  const user = await this.prismaService.user.findUnique({
    where: { email: email },
  });

  // If the user is not found, return a clear error message with null tokens
  if (!user) {
    return {
      user: '',
      accessToken: '',
      refreshToken: '',
      error: {
        message: 'User not found',
      },
    };
  }

  // Validate password
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return {
      user: '',
      accessToken: '',
      refreshToken: '',
      error: {
        message: 'Invalid credentials',
      },
    };
  }

  // If password is valid, generate tokens and return them
  const tokenSender = new TokenSender(this.configService, this.jwtService);
  const tokens = await tokenSender.sendToken(user);

  return {
    user: user,  // Return user details if needed
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    error: null,
  };
}


  async getUsers() {
    // Get all users
    return await this.prismaService.user.findMany();
  }

  //logout the user
  async logout(req: any) {
    //logout logic
    req.user = '';
    req.accesstoken = '';
    req.refreshtoken = '';
    
    return { message: 'User logged out successfully' };

  
  }

  async getLoggedInUser(req: any) {
    const user = req.user;
    const refreshToken = req.headers.refreshtoken;
    const accessToken = req.headers.accesstoken;
    console.log('req', accessToken+ refreshToken);

    console.log('user', { user, refreshToken, accessToken });
    return { user, refreshToken, accessToken };

  }

   
}
