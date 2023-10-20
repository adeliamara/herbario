export class CreateExsiccataDto {
  scientificName: string;
  collectionDate: Date;
  latitude: number;
  longitude: number;
  locationDescription: string;
  familyId: number;
  speciesId: number;
  genusId: number;
  collectorId: number;
  collectionNumberPerCollector: number;
  locationId: number;
  environmentId: number;
}
