import { ITransporter, NewTransporter } from './transporter.model';

export const sampleWithRequiredData: ITransporter = {
  id: 14802,
};

export const sampleWithPartialData: ITransporter = {
  id: 11965,
  name: 'plouf dynamique géométrique',
  avatar: 'pin-pon conseil d’administration',
  phoneNumber: 'tant que perdre',
};

export const sampleWithFullData: ITransporter = {
  id: 3509,
  name: 'bouffer du moment que en decà de',
  avatar: 'euh hier aussitôt que',
  phoneNumber: 'quasiment moderne ici',
  isActive: false,
};

export const sampleWithNewData: NewTransporter = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
