import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

export class Genus {  
@PrimaryGeneratedColumn('increment')
id: number;

@Column({ type: 'varchar', length: 255})
name: string;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at',   readonly: true})
createdAt: Date;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at',   readonly: true})
updatedAt: Date;
}
