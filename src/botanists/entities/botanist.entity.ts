import { Exsiccata } from "../../exsiccata/entities/exsiccata.entity";;
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Botanist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true})
  email: string;

  @Column({ type: 'varchar', length: 255})
  institution: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
  updatedAt: Date;

  @OneToMany(() => Exsiccata, exsiccata => exsiccata.collector)
  collectedExsiccatas: Exsiccata[];

  @OneToMany(() => Exsiccata, exsiccata => exsiccata.determinator)
  determinedExsiccatas: Exsiccata[];
}
