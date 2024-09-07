import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
//apollo
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    GraphQLModule.forRoot<
      ApolloFederationDriverConfig
      >({
        driver: ApolloFederationDriver,
        useGlobalPrefix: true,
        sortSchema: true,
        //gaye

        typePaths: ['**/*.graphql'],
        

      autoSchemaFile: true,
      
      },
      ),

  ],
  controllers: [

  ],
  
  providers: [AppService],
})
export class AppModule {}
