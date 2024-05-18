import { ILocation } from 'app/entities/location/location.model';
import { ICar } from 'app/entities/car/car.model';
import { ITransporter } from 'app/entities/transporter/transporter.model';
import { TripStatus } from 'app/entities/enumerations/trip-status.model';

export interface ITrip {
  id: number;
  name?: string | null;
  description?: string | null;
  status?: keyof typeof TripStatus | null;
  departureDate?: string | null;
  arrivalDate?: string | null;
  price?: number | null;
  departureLocation?: ILocation | null;
  arrivalLocation?: ILocation | null;
  car?: ICar | null;
  transporter?: ITransporter | null;
}

export type NewTrip = Omit<ITrip, 'id'> & { id: null };
