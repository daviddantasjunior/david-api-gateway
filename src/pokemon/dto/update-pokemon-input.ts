import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePokemonInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty or null' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Type cannot be empty or null' })
  type?: string;
}
