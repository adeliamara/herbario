import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'location_table' })
@Index(['city', 'state'], { unique: true })

export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  state: string;
}