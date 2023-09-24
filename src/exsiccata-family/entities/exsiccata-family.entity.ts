import { Exsiccata } from "src/exsiccata/entities/exsiccata.entity";
import { Family } from "src/families/entities/family.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('exsiccata_family')
export class ExsiccataFamily {
  @PrimaryColumn({ name: 'exsiccata_id' })
  exsiccataId: number;

  @PrimaryColumn({ name: 'family_id' })
  familyId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
  updatedAt: Date;

  @ManyToOne(
    () => Exsiccata,
    exsiccata => exsiccata.families
  )
  @JoinColumn([{ name: 'exsiccata_id', referencedColumnName: 'id' }])
  exsiccatas: Exsiccata[];

  @ManyToOne(
    () => Family,
    family => family.exsiccatas
  )
  @JoinColumn([{ name: 'family_id', referencedColumnName: 'id' }])
  families: Family[];

}

