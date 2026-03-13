import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateSeasonDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

}