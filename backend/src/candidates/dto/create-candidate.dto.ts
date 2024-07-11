import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
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
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2, { message: 'At least one time is required' })
  @ArrayMaxSize(2, { message: 'No more than 2 time are allowed' })
  timeInterval: string[];

  @IsOptional()
  @IsUrl()
  linkedin: string;

  @IsOptional()
  @IsUrl()
  github: string;
}
