import { Body, Controller, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Controller('auth')
export class AuthController {
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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async login(@Body() authInput: AuthInput): Promise<AuthType> {
    return await this.clientProxy.send('auth-login', authInput).toPromise();
  }
}
