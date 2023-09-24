import { Exsiccata } from "src/exsiccata/entities/exsiccata.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Species } from "src/species/entities/species.entity";

@Entity('exsiccata_species')
export class ExsiccataSpecies {
  @PrimaryColumn({ name: 'exsiccata_id' })
  exsiccataId: number;

  @PrimaryColumn({ name: 'species_id' })
  speciesId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
  updatedAt: Date;

  @ManyToOne(
    () => Exsiccata,
    exsiccata => exsiccata.species
  )
  @JoinColumn([{ name: 'exsiccata_id', referencedColumnName: 'id' }])
  exsiccatas: Exsiccata[];

  @ManyToOne(
    () => Species,
    species => species.exsiccatas
  )
  @JoinColumn([{ name: 'species_id', referencedColumnName: 'id' }])
  species: Species[];

}

