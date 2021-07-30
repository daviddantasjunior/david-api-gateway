import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user-input';
import { UpdateUserInput } from './dto/update-user-input';
import { User } from './user.interface';

@Controller('user')
export class UserController {
  private clientProxy: ClientProxy;

  constructor() {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_URL}`,
        ],
        queue: 'pokemon',
      },
    });
  }

  @Post()
  async createUser(@Body() createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    return await this.clientProxy
      .send('create-user', createUserInput)
      .toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @Body('_id') _id: string,
    @Body('updateUserInput')
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.clientProxy
      .send('update-user', { _id, updateUserInput })
      .toPromise();
  }
}
