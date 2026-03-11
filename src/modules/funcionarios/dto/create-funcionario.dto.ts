import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateFuncionarioDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

}