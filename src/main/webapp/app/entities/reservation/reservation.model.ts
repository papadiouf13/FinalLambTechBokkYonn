import { ITrip } from 'app/entities/trip/trip.model';
import { ISeat } from 'app/entities/seat/seat.model';
import { ReservationStatus } from 'app/entities/enumerations/reservation-status.model';

export interface IReservation {
  id: number;
  departureTimme?: string | null;
  status?: keyof typeof ReservationStatus | null;
  reservationNumber?: string | null;
  trip?: ITrip | null;
  seat?: ISeat | null;
}

export type NewReservation = Omit<IReservation, 'id'> & { id: null };
