import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Candidate } from './entities/candidate.entity';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @ApiCreatedResponse({ type: Candidate })
  @Post()
  create(
    @Body(new ValidationPipe()) createCandidateDto: CreateCandidateDto,
  ): Promise<Candidate> {
    return this.candidatesService.create(createCandidateDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ candidates: Candidate[]; count: number }> {
    return this.candidatesService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Candidate> {
    return this.candidatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    return this.candidatesService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }
}
