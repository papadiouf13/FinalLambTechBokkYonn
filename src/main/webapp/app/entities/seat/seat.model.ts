import { ICar } from 'app/entities/car/car.model';

export interface ISeat {
  id: number;
  seatNumber?: number | null;
  isAvailable?: boolean | null;
  car?: ICar | null;
}

export type NewSeat = Omit<ISeat, 'id'> & { id: null };
