import { IReservation, NewReservation } from './reservation.model';

export const sampleWithRequiredData: IReservation = {
  id: 22664,
};

export const sampleWithPartialData: IReservation = {
  id: 23642,
};

export const sampleWithFullData: IReservation = {
  id: 15653,
  departureTimme: 'quand',
  status: 'CONFIRMED',
  reservationNumber: 'exploiter',
};

export const sampleWithNewData: NewReservation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
