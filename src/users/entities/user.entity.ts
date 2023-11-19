import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../setup/enums/role.enum';
import { RoleEntity } from '../../role/entities/role.entity';

@Entity({ name: 'user_table' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column({nullable: true})
  phone: string;

  @Column({ default: false })
  removed: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn({name: 'created_at'})
  createdAt: Date;

  @CreateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @Column({name: 'email_verified_at', nullable: true})
  emailVerifiedAt: Date;

  @Column({name: 'remember_token', nullable: true})
  rememberToken: string;

  @ManyToMany(() => RoleEntity, { eager: true, cascade: true })
  @JoinTable()
  roles: RoleEntity[];

}
