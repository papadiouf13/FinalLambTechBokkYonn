import { IReservation } from 'app/entities/reservation/reservation.model';
import { PaymentStatus } from 'app/entities/enumerations/payment-status.model';

export interface IPayment {
  id: number;
  status?: keyof typeof PaymentStatus | null;
  date?: string | null;
  reservation?: IReservation | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };
