import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'email@example.com' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty()
  email: string;
}
