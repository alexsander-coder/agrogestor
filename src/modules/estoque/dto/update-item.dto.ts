import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateItemDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumStock?: number;
}