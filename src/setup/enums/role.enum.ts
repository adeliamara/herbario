// role.enum.ts
export enum Role {
  ADMIN = 'Admin',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

// Utilize uma função para mapear os valores do enum para a tabela de roles
export const RoleTableMapping: Record<Role, string> = {
  [Role.ADMIN]: 'Admin',
  [Role.USER]: 'User',
  [Role.MODERATOR]: 'Moderator',
};
