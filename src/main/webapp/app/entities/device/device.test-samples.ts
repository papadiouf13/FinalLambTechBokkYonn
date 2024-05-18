import { IDevice, NewDevice } from './device.model';

export const sampleWithRequiredData: IDevice = {
  id: 28574,
  token: 'rédaction dans la mesure où',
};

export const sampleWithPartialData: IDevice = {
  id: 4,
  platform: 'plutôt lorsque lorsque',
  brand: 'interdire',
  token: 'à peine tandis que jeune',
  model: 'épanouir camper',
  isActive: true,
  createdAt: 'cocorico psitt un peu',
  updatedAt: 'vis-à-vie de',
};

export const sampleWithFullData: IDevice = {
  id: 26513,
  platform: 'sans que vivace sauvage',
  brand: 'reconnaître pauvre',
  token: 'environ tant',
  model: 'vouh camarade',
  osVersion: "selon à l'exception de rédaction",
  isActive: false,
  createdAt: 'au lieu de corps enseignant',
  updatedAt: 'fouiller',
};

export const sampleWithNewData: NewDevice = {
  token: 'près coupable commissionnaire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
