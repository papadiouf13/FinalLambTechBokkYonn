export interface IDevice {
  id: number;
  platform?: string | null;
  brand?: string | null;
  token?: string | null;
  model?: string | null;
  osVersion?: string | null;
  isActive?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type NewDevice = Omit<IDevice, 'id'> & { id: null };
