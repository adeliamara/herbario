import { Exsiccata } from 'src/exsiccata/entities/exsiccata.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, JoinTable, OneToMany } from 'typeorm';

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