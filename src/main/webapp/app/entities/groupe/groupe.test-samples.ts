import { IGroupe, NewGroupe } from './groupe.model';

export const sampleWithRequiredData: IGroupe = {
  id: 17940,
  nom: 'ah diététiste traîner',
};

export const sampleWithPartialData: IGroupe = {
  id: 18816,
  nom: 'jamais apporter triompher',
};

export const sampleWithFullData: IGroupe = {
  id: 9586,
  nom: 'mener',
};

export const sampleWithNewData: NewGroupe = {
  nom: 'partenaire gigantesque géométrique',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
