import { IGroupe } from 'app/entities/groupe/groupe.model';
import { IUser } from 'app/entities/user/user.model';

export interface IContact {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  street?: string | null;
  telephone?: string | null;
  groupe_id?: IGroupe | null;
  user_id?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewContact = Omit<IContact, 'id'> & { id: null };
