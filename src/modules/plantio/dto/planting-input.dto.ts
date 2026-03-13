import { IsUUID, IsNumber, Min } from 'class-validator';

export class PlantingInputDto {

  @IsUUID()
  itemId: string;

  @IsNumber()
  @Min(0.0001)
  quantity: number;

}