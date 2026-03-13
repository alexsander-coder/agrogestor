import { IsUUID, IsDateString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { PlantingInputDto } from './planting-input.dto';

export class CreatePlantingDto {

  @IsUUID()
  areaId: string;

  @IsUUID()
  cropId: string;

  @IsUUID()
  seasonId: string;

  @IsDateString()
  plantingDate: string;

  @ValidateNested({ each: true })
  @Type(() => PlantingInputDto)
  @ArrayMinSize(1)
  inputs: PlantingInputDto[];

}