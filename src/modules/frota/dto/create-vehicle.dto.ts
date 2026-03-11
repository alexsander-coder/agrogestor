import { IsString, IsInt, IsNumber } from "class-validator";

export class CreateVehicleDto {

  @IsString()
  plate: string;

  @IsString()
  model: string;

  @IsString()
  brand: string;

  @IsInt()
  year: number;

  @IsNumber()
  odometer: number;

}