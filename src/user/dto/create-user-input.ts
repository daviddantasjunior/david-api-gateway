import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty or null' })
  @Length(8, 20, { message: 'Must contain at least eight characters' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Nickname cannot be empty or null' })
  nickname: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Mail cannot be empty or null' })
  mail: string;
}
