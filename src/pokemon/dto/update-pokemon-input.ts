import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePokemonInput {
  @ApiProperty({ type: String, description: 'Pokemon Name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty or null' })
  name?: string;

  @ApiProperty({ type: String, description: 'Pokemon Type' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Type cannot be empty or null' })
  type?: string;
}
