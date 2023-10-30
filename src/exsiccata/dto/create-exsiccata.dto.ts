import { IsDate, IsEmpty, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { isBoxedPrimitive } from "util/types";

export class CreateExsiccataDto {

  @IsEmpty()
  scientificName: string;

  @IsNotEmpty()
  @IsDate()
  collectionDate: Date;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
  
  locationDescription: string;

  @IsNumber()
  familyId: number;

  @IsNumber()
  speciesId: number;

  @IsNumber()
  genusId: number;

  @IsNumber()
  collectorId: number;

  @IsNotEmpty()
  collectionNumberPerCollector: number;

  @IsNumber()
  locationId: number;

  @IsNumber()
  environmentId: number;

  @IsNumber()
  @IsOptional()
  determinatorId: number;

  @IsEmpty()
  readonly createdAt: Date;

  @IsEmpty()
  readonly updatedAt: Date;

  @IsEmpty()
  deletedAt: Date;
}
