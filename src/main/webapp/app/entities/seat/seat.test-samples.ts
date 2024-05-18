import { ISeat, NewSeat } from './seat.model';

export const sampleWithRequiredData: ISeat = {
  id: 29616,
};

export const sampleWithPartialData: ISeat = {
  id: 6194,
  seatNumber: 12404,
  isAvailable: true,
};

export const sampleWithFullData: ISeat = {
  id: 31810,
  seatNumber: 22722,
  isAvailable: true,
};

export const sampleWithNewData: NewSeat = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
