import { IContact, NewContact } from './contact.model';

export const sampleWithRequiredData: IContact = {
  id: 10916,
  nom: 'membre de l’équipe',
  prenom: 'rapide psitt bien que',
  email: 'Auxence28@gmail.com',
  telephone: '0436643913',
};

export const sampleWithPartialData: IContact = {
  id: 12877,
  nom: 'près tsoin-tsoin essuyer',
  prenom: 'sans de peur que hypocrite',
  email: 'Angeline.Laine45@gmail.com',
  telephone: '+33 343666738',
};

export const sampleWithFullData: IContact = {
  id: 4920,
  nom: 'vorace adversaire ressortir',
  prenom: 'ferme',
  email: 'Innocent_Noel1@hotmail.fr',
  street: 'Boulevard du Chat-qui-Pêche',
  telephone: '0796487016',
};

export const sampleWithNewData: NewContact = {
  nom: 'sincère de manière à ce que',
  prenom: 'derrière smack',
  email: 'Aurore.Maillard43@yahoo.fr',
  telephone: '0506273918',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
