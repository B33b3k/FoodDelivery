import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
//apollo
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UsersResolver } from './users.resolver';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    GraphQLModule.forRoot<
      ApolloFederationDriverConfig
      >({
        driver: ApolloFederationDriver,
        useGlobalPrefix: true,
        

        // typePaths: ['**/*.graphql'],
        

        autoSchemaFile: 
        {
          federation: 2,
        }
        
        ,
      
      },
      ),
    EmailModule,

  ],
  controllers: [
    UsersController,


  ],
  
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    PrismaService,
    UsersResolver

  ],
})
export class UsersModule {}
