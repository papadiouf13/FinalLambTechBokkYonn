export interface ITransporter {
  id: number;
  name?: string | null;
  avatar?: string | null;
  phoneNumber?: string | null;
  isActive?: boolean | null;
}

export type NewTransporter = Omit<ITransporter, 'id'> & { id: null };
