import { IsUUID, IsNumber } from "class-validator";

export class CreateRefuelDto {

  @IsUUID()
  vehicleId: string;

  @IsUUID()
  tankId: string;

  @IsNumber()
  liters: number;

  @IsNumber()
  odometer: number;

}