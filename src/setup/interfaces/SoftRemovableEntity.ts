export interface SoftRemovableEntity {
    deletedAt?: Date | null;
    restore(): void;
  }
  