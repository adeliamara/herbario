import { IsNotEmpty } from "class-validator";
import { Exsiccata } from "src/exsiccata/entities/exsiccata.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Environment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Exsiccata, (exsiccata) => exsiccata.environment)
    exsiccatas: Exsiccata[];
}

