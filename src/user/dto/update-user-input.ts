import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserInput {
  @ApiProperty({ type: String, description: 'User Password' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty or null' })
  @Length(8, 20, { message: 'Must contain at least eight characters' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password?: string;

  @ApiProperty({ type: String, description: 'User Nickname' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Nickname cannot be empty or null' })
  nickname?: string;

  @ApiProperty({ type: String, description: 'User Mail' })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Mail cannot be empty or null' })
  mail?: string;
}
