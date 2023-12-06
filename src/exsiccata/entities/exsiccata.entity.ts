import { IsEmpty, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Botanist } from "src/botanists/entities/botanist.entity";
import { Environment } from "src/environments/entities/environment.entity";
import { Family } from "src/families/entities/family.entity";
import { Genus } from "src/genus/entities/genus.entity";
import { Location } from "src/locations/entities/location.entity";
import { Species } from "src/species/entities/species.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Exsiccata {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'scientific_name', nullable: true})
  scientificName: string;

  @Column({ type: 'timestamp', name: 'collection_date' })
  collectionDate: Date;

  @Column({ type: 'int'})
  collectionNumberPerCollector: number;

  @Column({ type: 'varchar', length: 100, name: 'common_name', nullable: true })
  commonName: string;

  @Column({ type: 'varchar', length: 100, name: 'growth_habit', nullable: true })
  growthHabit: string;
  
  @Column({ type: 'varchar', length: 100})
  color: string;

  @Column({type: 'float'})
  latitude: number;

  @Column({type: 'float'})
  longitude: number;

  @Column({ type: 'varchar', length: 255, name: 'location_description', nullable: true })
  locationDescription: string;

  @IsEmpty()
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

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

  @ManyToOne(() => Botanist, collector => collector.collectedExsiccatas)
  @JoinColumn({ name: 'collector_id' }) 
  collector: Botanist;
  
  @ManyToOne(() => Botanist, determinator => determinator.determinedExsiccatas, { nullable: true })
  @JoinColumn({ name: 'determinator_id' }) 
  determinator: Botanist;

  @ManyToOne(() => Location, location => location.exsiccatas)
  @JoinColumn({ name: 'location_id' }) 
  location: Location;

  @ManyToOne(() => Environment, environment => environment.exsiccatas)
  @JoinColumn({ name: 'environment_id' }) 
  environment: Environment;

  @ManyToOne(() => User, user => user.exsiccatas)
  user: User;

  @Column({ type: 'date', nullable: true, name: 'determination_date'})
  determinationDate: Date | null;

  @BeforeUpdate()
  updateDeterminatorDate() {
    if (this.determinator) {
      this.determinationDate = new Date();
    }
  }
}
