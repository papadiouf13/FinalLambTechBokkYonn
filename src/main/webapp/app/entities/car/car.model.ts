import { ITransporter } from 'app/entities/transporter/transporter.model';

export interface ICar {
  id: number;
  name?: string | null;
  description?: string | null;
  numberOfSeats?: number | null;
  numberOfAvailableSeats?: number | null;
  isActive?: boolean | null;
  plateNumber?: string | null;
  transporter?: ITransporter | null;
}

export type NewCar = Omit<ICar, 'id'> & { id: null };
