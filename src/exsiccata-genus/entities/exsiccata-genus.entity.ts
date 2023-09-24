import { Exsiccata } from "src/exsiccata/entities/exsiccata.entity";
import { Genus } from "src/genus/entities/genus.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('exsiccata_genus')
export class ExsiccataGenus {
  @PrimaryColumn({ name: 'exsiccata_id' })
  exsiccataId: number;

  @PrimaryColumn({ name: 'genus_id' })
  genusId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
  updatedAt: Date;

  @ManyToOne(
    () => Exsiccata,
    exsiccata => exsiccata.genus
  )
  @JoinColumn([{ name: 'exsiccata_id', referencedColumnName: 'id' }])
  exsiccatas: Exsiccata[];

  @ManyToOne(
    () => Genus,
    genus => genus.exsiccatas
  )
  @JoinColumn([{ name: 'genus_id', referencedColumnName: 'id' }])
  genus: Genus[];

}

