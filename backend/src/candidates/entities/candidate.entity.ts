import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

@Entity('candidate')
export class Candidate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  comment: string;

  @ApiProperty()
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  @IsArray()
  @ArrayMinSize(2, { message: 'At least one time is required' })
  @ArrayMaxSize(2, { message: 'No more than 2 time are allowed' })
  @IsString({ each: true, message: 'Each time must be a string' })
  timeInterval: string[];

  @ApiProperty()
  @Column({ nullable: true })
  linkedin: string;

  @ApiProperty()
  @Column({ nullable: true })
  github: string;
}
