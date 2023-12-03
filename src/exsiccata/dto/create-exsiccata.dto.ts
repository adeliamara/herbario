import { Type } from "class-transformer";
import { IsDate, IsEmpty, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { isBoxedPrimitive } from "util/types";

export class CreateExsiccataDto {

  @IsEmpty()
  scientificName: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  collectionDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  determinationDate: Date;

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

  @IsEmpty()
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
