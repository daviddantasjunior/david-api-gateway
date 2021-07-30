import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePokemonInput } from './dto/create-pokemon-input';
import { UpdatePokemonInput } from './dto/update-pokemon-input';
import { Pokemon } from './pokemon.interface';

@Controller('pokemon')
export class PokemonController {
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPokemon(
    @Body() createPokemonInput: CreatePokemonInput,
  ): Promise<Pokemon> {
    return await this.clientProxy
      .send('create-pokemon', createPokemonInput)
      .toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllPokemons(): Promise<Pokemon[]> {
    return await this.clientProxy.send('find-all-pokemons', '').toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':pokemonId')
  async findByIdPokemon(@Param('pokemonId') pokemonId: number): Promise<Pokemon | null> {
    return await this.clientProxy.send('find-by-id-pokemon', pokemonId).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':pokemonId')
  async deletePokemon(@Param('pokemonId') pokemonId: number): Promise<boolean> {
    const deleted = await this.clientProxy.send('delete-pokemon', pokemonId).toPromise();
    return deleted;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updatePokemon(
    @Body('pokemonId') pokemonId: string,
    @Body('updatePokemonInput') updatePokemonInput: UpdatePokemonInput,
  ): Promise<Pokemon> {
    return await this.clientProxy
      .send('update-pokemon', { pokemonId, updatePokemonInput })
      .toPromise();
  }
}
