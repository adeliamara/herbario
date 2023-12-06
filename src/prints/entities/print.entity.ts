import { Exsiccata } from "src/exsiccata/entities/exsiccata.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Species } from "src/species/entities/species.entity";

@Entity('prints')
export class Print {
    @PrimaryColumn({ name: 'exsicata_id' })
    exsicataId: number;
  
    @PrimaryColumn({ name: 'user_id' })
    userId: number;
  
   @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
