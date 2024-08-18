import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidatesRepository: Repository<Candidate>,
  ) {}

  async findOneByEmail(email: string): Promise<Candidate> {
    return await this.candidatesRepository.findOne({ where: { email } });
  }
  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const candidateExists = await this.findOneByEmail(createCandidateDto.email);
    if (candidateExists) {
      throw new ConflictException(
        `Candidate with email ${createCandidateDto.email} already exists`,
      );
    }
    try {
      const candidate = this.candidatesRepository.create(createCandidateDto);
      return this.candidatesRepository.save(candidate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ candidates: Candidate[]; count: number }> {
    const [data, count] = await this.candidatesRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { candidates: data, count };
  }

  async findOne(id: number): Promise<Candidate> {
    try {
      return await this.candidatesRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: number,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    try {
      const candidate = await this.findOne(id);
      const updateCandidate = this.candidatesRepository.merge(
        candidate,
        updateCandidateDto,
      );
      return this.candidatesRepository.save(updateCandidate);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<Candidate> {
    const existingCandidate = await this.findOne(id);
    if (!existingCandidate) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    try {
      return await this.candidatesRepository.remove(existingCandidate);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
