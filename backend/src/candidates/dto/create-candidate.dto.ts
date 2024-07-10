import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  timeInterval: string;

  @IsOptional()
  @IsUrl()
  linkedin: string;

  @IsOptional()
  @IsUrl()
  github: string;
}
