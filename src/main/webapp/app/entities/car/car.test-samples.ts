import { ICar, NewCar } from './car.model';

export const sampleWithRequiredData: ICar = {
  id: 29040,
};

export const sampleWithPartialData: ICar = {
  id: 23353,
  name: 'sous couleur de par rapport à',
  description: 'envers',
  isActive: true,
};

export const sampleWithFullData: ICar = {
  id: 19201,
  name: 'tsoin-tsoin vu que',
  description: 'sitôt que de façon à ce que efficace',
  numberOfSeats: 23882,
  numberOfAvailableSeats: 25778,
  isActive: false,
  plateNumber: 'pendant que tant sitôt',
};

export const sampleWithNewData: NewCar = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
