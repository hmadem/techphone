import { Commentaire } from './commentaire';

export interface Telephone {
  id: string;
  nom: string;
  marque: string;
  modele: string;
  photo: string;
  prix: number;
  disponible: boolean;
  dateAjout: Date;
  commentaires: Commentaire[];
}