import { Exsiccata } from 'src/exsiccata/entities/exsiccata.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm';
import { SoftRemovableEntity } from '../../setup/interfaces/SoftRemovableEntity';

@Entity()
export class Botanist implements SoftRemovableEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true})
  email: string;

  @Column({ type: 'varchar', length: 255})
  institution: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Exsiccata, exsiccata => exsiccata.collector)
  collectedExsiccatas: Exsiccata[];

  @OneToMany(() => Exsiccata, exsiccata => exsiccata.determinator)
  determinedExsiccatas: Exsiccata[];

  restore(): void {
    this.deletedAt = null;
  }
}
