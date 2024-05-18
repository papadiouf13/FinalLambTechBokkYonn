import { ITrip, NewTrip } from './trip.model';

export const sampleWithRequiredData: ITrip = {
  id: 28843,
};

export const sampleWithPartialData: ITrip = {
  id: 3057,
  description: 'bzzz comme',
  status: 'CANCELED',
  departureDate: 'crac plic exprès',
  price: 17300,
};

export const sampleWithFullData: ITrip = {
  id: 23837,
  name: 'géométrique areu areu délectable',
  description: 'debout en bas de',
  status: 'IN_PROGRESS',
  departureDate: 'ranimer avare si bien que',
  arrivalDate: 'minuscule',
  price: 32285,
};

export const sampleWithNewData: NewTrip = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
