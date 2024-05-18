import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: 25964,
};

export const sampleWithPartialData: IPayment = {
  id: 14909,
};

export const sampleWithFullData: IPayment = {
  id: 1800,
  status: 'PENDING',
  date: 'de sorte que',
};

export const sampleWithNewData: NewPayment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
