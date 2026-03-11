import { IsUUID, IsNumber, IsOptional } from "class-validator";

export class CreateFuelEntryDto {

  @IsUUID()
  tankId: string;

  @IsNumber()
  liters: number;

  @IsOptional()
  @IsNumber()
  price?: number;

}