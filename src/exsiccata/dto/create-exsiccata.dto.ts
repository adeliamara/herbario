import { IsEmpty, IsLatitude, IsLongitude } from "class-validator";
import { isBoxedPrimitive } from "util/types";

export class CreateExsiccataDto {
  scientificName: string;
  collectionDate: Date;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
  
  locationDescription: string;
  familyId: number;
  speciesId: number;
  genusId: number;
  collectorId: number;
  collectionNumberPerCollector: number;
  locationId: number;
  environmentId: number;
  determinatorId: number;

  @IsEmpty()
  readonly createdAt: Date;

  @IsEmpty()
  readonly updatedAt: Date;

  @IsEmpty()
  deletedAt: Date;
}
