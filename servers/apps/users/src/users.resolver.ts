import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/users.entities';
import { ActivationDto, LoginInput, RegisterDto } from './dto/users.dto';
import { ActivationResponse, LoginResponseType, LogoutResponse, RegisterResponseType } from './types/users.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  
    

  // Register user mutation without user in response
  @Mutation(() => RegisterResponseType)
  async registerUser(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (!registerDto) {
      return {
        error: {
          message: 'Invalid input',
          statusCode: 400,
        },
      };
    }

    // Register the user and get the activation token
    const { activationToken } = await this.usersService.registerUser(registerDto);

    return {
      activation_token: activationToken, // Only return the activation token
    };
  }

  // Activate user mutation
  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args('activationInput') activationDto: ActivationDto, // Ensure correct input object
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.usersService.activateUser(activationDto, context.res);
  }
    
    // Login user mutation
    @Mutation(() => LoginResponseType)
    async loginUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Context() context: { res: Response },
    )
    {
        return await this.usersService.loginUser(email, password);
     
    }

    //logged in
    @Query(() => LoginResponseType)
    @UseGuards(AuthGuard)
    async getLoggedIn(
        @Context() context: { req: Request },
    )
    {
        console.log(context.req);
        return await this.usersService.getLoggedInUser(context.req);
    }

     @Query(() => LogoutResponse)
    @UseGuards(AuthGuard)
    async logoutUser(
        @Context() context: { req: Request },
    )
    {
        console.log(context.req);
        return await this.usersService.logout(context.req);
     }
    
    

  // Get users query
    @Query(() => [User])
  async getUsers() {
    return await this.usersService.getUsers();
  }
}
