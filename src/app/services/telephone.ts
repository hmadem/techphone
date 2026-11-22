import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Telephone } from '../models/telephone';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {

  private http = inject(HttpClient);
  private url = 'http://localhost:3300/telephones';

  telephones = signal<Telephone[]>([]);
  chargement = signal<boolean>(true);
  erreur = signal<string | null>(null);

  chargerTelephones() {
    this.chargement.set(true);
    this.http.get<Telephone[]>(this.url).subscribe({
      next: (data) => {this.telephones.set(data.map(tel => ({...tel,dateAjout: new Date(tel.dateAjout)})));
        this.chargement.set(false);
        this.erreur.set(null);
      },
      error: (err) => {
        console.error(err);
        this.erreur.set('Impossible de charger les téléphones.');
        this.chargement.set(false);
      }
    });
  }

  constructor() {
    this.chargerTelephones();
  }

  ajouterTelephone(telephone: Omit<Telephone,'id'>) {
    this.http.post(this.url, telephone).subscribe({
      next: () => {
        this.chargerTelephones();
        alert('Telephone added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Error adding telephone.');
      }
    });
  }

  modifierTelephone(telephone: Telephone) {
    return this.http.put<Telephone>(`${this.url}/${telephone.id}`,telephone);
  }

  supprimerTelephone(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => {
        this.chargerTelephones();
      },
      error: (err) => console.error('Erreur suppression:', err)
    });
  }

  obtenirTelephone(id: string) {
    return this.http.get<Telephone>(`${this.url}/${id}`);
  }

}


