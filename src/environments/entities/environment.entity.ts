import { Column, Entity, OneToMany, PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Exsiccata } from "../../exsiccata/entities/exsiccata.entity";


@Entity()
export class Environment {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 255})
    name: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
    updatedAt: Date;

    @OneToMany(() => Exsiccata, (exsiccata) => exsiccata.environment)
    exsiccatas: Exsiccata[];
}

