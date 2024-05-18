export interface ILocation {
  id: number;
  name?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export type NewLocation = Omit<ILocation, 'id'> & { id: null };
