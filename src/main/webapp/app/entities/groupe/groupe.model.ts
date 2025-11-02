export interface IGroupe {
  id: number;
  nom?: string | null;
}

export type NewGroupe = Omit<IGroupe, 'id'> & { id: null };
