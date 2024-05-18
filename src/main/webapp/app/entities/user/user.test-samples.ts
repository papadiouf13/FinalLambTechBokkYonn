import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 7025,
  login: 'S0@f\\:bl-\\\\Y0cD\\~4PiPDZ',
};

export const sampleWithPartialData: IUser = {
  id: 16206,
  login: 'kVIX7',
};

export const sampleWithFullData: IUser = {
  id: 4344,
  login: 'jfJUd@X\\#1LoUL',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
