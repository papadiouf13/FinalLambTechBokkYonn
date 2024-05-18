import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 21803,
};

export const sampleWithPartialData: ILocation = {
  id: 19982,
  latitude: 24145.03,
};

export const sampleWithFullData: ILocation = {
  id: 7259,
  name: 'pourvu que',
  address: 'placide',
  latitude: 32099.4,
  longitude: 19375.57,
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
