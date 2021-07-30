import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePokemonInput {
  @ApiProperty({ type: String, description: 'Pokemon Name' })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty or null' })
  name: string;

  @ApiProperty({ type: String, description: 'Pokemon Type' })
  @IsString()
  @IsNotEmpty({ message: 'Type cannot be empty or null' })
  type: string;
}
