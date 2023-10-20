import { IsNumber, Max, Min } from "class-validator";
import { Collector } from "src/collectors/entities/collector.entity";
import { Environment } from "src/environments/entities/environment.entity";
import { Family } from "src/families/entities/family.entity";
import { Genus } from "src/genus/entities/genus.entity";
import { Location } from "src/locations/entities/location.entity";
import { Species } from "src/species/entities/species.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exsiccata {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'scientific_name' })
  scientificName: string;

  @Column({ type: 'timestamp', name: 'collection_date' })
  collectionDate: Date;

  @Column({ type: 'int'})
  collectionNumberPerCollector: number;

  @Column({ type: 'varchar', length: 100, name: 'common_name' })
  commonName: string;

  @Column({ type: 'varchar', length: 100, name: 'growth_habit' })
  growthHabit: string;
  
  @Column({ type: 'varchar', length: 100})
  color: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @Column({ type: 'varchar', length: 255, name: 'location_description' })
  locationDescription: string;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(
    () => Family,
    family => family.exsiccatas)
  @JoinTable({
    name: 'exsiccata_family',
    joinColumn: {
      name: 'exsiccata_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'family_id',
      referencedColumnName: 'id',
    },
  })
  families?: Family[];

  @ManyToMany(
    () => Species,
    species => species.exsiccatas)
  @JoinTable({
    name: 'exsiccata_species',
    joinColumn: {
      name: 'exsiccata_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'species_id',
      referencedColumnName: 'id',
    },
  })
  species?: Species[];

  @ManyToMany(
    () => Genus,
    genus => genus.exsiccatas)
  @JoinTable({
    name: 'exsiccata_genus',
    joinColumn: {
      name: 'exsiccata_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genus_id',
      referencedColumnName: 'id',
    },
  })
  genus?: Genus[];

  @ManyToOne(() => Collector, collector => collector.exsiccatas)
  collector: Collector;

  @ManyToOne(() => Location, location => location.exsiccatas)
  location: Location;

  @ManyToOne(() => Environment, environment => environment.exsiccatas)
  environment: Environment;
}
