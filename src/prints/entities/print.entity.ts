import { Exsiccata } from "src/exsiccata/entities/exsiccata.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Species } from "src/species/entities/species.entity";

@Entity('prints')
export class Print {
    @PrimaryColumn({ name: 'exsicata_id' })
    exsicataId: number;
  
    @PrimaryColumn({ name: 'user_id' })
    userId: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
    updatedAt: Date;
}
