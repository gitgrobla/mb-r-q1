import { 
    IsNotEmpty, 
    IsEmail, 
    IsNumber, 
    IsEnum, 
    IsDateString,
    IsOptional,
    IsPhoneNumber
  } from 'class-validator';
import { RecruitmentState } from '../types';
  
  export class CandidateInputDto {
    @IsNotEmpty({ message: 'First name is required' })
    firstname: string;
  
    @IsNotEmpty({ message: 'Last name is required' })
    surname: string;
  
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsOptional()
    @IsPhoneNumber('PL', { message: 'Invalid phone number format' })
    phoneNumber?: string;
  
    @IsNumber()
    experience: number;
  
    @IsOptional()
    notes?: string;
  
    @IsEnum(RecruitmentState)
    recruitmentState: RecruitmentState;
  
    @IsDateString()
    agreeDate: Date;

    @IsNotEmpty()
    jobOfferIds: number[]
  }