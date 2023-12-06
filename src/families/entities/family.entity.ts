import { Exsiccata } from 'src/exsiccata/entities/exsiccata.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, DeleteDateColumn } from 'typeorm';
import { SoftRemovableEntity } from '../../setup/interfaces/SoftRemovableEntity';

@Entity()
export class Family implements SoftRemovableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at',   readonly: true})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at',   readonly: true})
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
  
  @ManyToMany(() => Exsiccata,     exsiccata => exsiccata.families)
  exsiccatas?: Exsiccata[];

  restore(): void {
    this.deletedAt = null;
  }
}
