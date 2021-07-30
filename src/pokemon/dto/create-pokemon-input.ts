import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePokemonInput {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty or null' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Type cannot be empty or null' })
  type: string;
}


