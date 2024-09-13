//users dto

import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()

export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })

  name!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Old password is required' })
  oldPassword: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6)
  newPassword: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6)
  password: string;
}

//register user
@InputType()
export class RegisterDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(6)
  confirmPassword: string;

  //phone number
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone_number: string;

  //address
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

}

//activation dto
@InputType()
export class ActivationDto {
  //activation token and code
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Activation token is required' })
  token: string;

   @Field()
  @IsString()
  @IsNotEmpty({ message: 'Activation token is required' })
  activationCode: string;




}