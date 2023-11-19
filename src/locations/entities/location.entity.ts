import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exsiccata } from '../../exsiccata/entities/exsiccata.entity';

@Entity({ name: 'location_table' })
@Index(['city', 'state'], { unique: true })

export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(() => Exsiccata, exsiccata => exsiccata.location)
  exsiccatas?: Exsiccata[]
}