//user types

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../entities/users.entities';

@Entity()
@ObjectType()
export class ErrorType {
  @Field()
  message: String;
    
    @Field({nullable: true})
    statusCode: Number;
}

@Entity()
@ObjectType()
export class RegisterResponseType {
    //USER
    


    @Field()
    activation_token: string;
    
    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType | any = null;
  
    
 
}

//activation response

    @ObjectType()
    export class ActivationResponse {
        @Field(() => User,{nullable: true})
        user?: User | any = null;
        
        @Field(() => ErrorType, { nullable: true })
        error?: ErrorType | any = null;
    }

@Entity()
@ObjectType()
export class LoginResponseType {
    //email password
    @Field(() => User,{nullable: true})
        user?: User | any = null;

    @Field()
    accessToken!: string;

    @Field()
    refreshToken!: string;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType | any = null;
 

}
@Entity()
@ObjectType()
export class LogoutResponse {
    @Field()
    message: String;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType | any = null;
    
 

}


