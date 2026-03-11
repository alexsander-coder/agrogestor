import { IsString, IsNumber } from "class-validator";

export class CreateTankDto {

  @IsString()
  name: string;

  @IsNumber()
  capacity: number;

}