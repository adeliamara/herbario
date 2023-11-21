import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Role } from "../../setup/enums/role.enum";
import { User } from "../../users/entities/user.entity";
import { RoleEntity } from "../../role/entities/role.entity";

@Entity({ name: 'user_roles' })
export class UserRole {
    @PrimaryColumn({ name: 'role_id' })
    roleId: number;
  
    @PrimaryColumn({ name: 'user_id' })
    userId: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at'  })
    updatedAt: Date;
  
    @ManyToOne(
      () => RoleEntity,
      role => role.users
    )
    @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
    roles: RoleEntity[];
  
    @ManyToOne(
      () => User,
      user => user.roles
    )
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    users: User[];
}
