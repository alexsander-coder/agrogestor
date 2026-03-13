import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateSeasonDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

}