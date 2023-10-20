import { IsNotEmpty } from "class-validator";
import { Exsiccata } from "src/exsiccata/entities/exsiccata.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Environment {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 255})
    name: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
    updatedAt: Date;

    @OneToMany(() => Exsiccata, (exsiccata) => exsiccata.environment)
    exsiccatas: Exsiccata[];
}

