
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3300/demandes';

  demandes = signal<Demande[]>([]);
  ajouterDemande(demande: Demande) {
    return this.http.post<Demande>(this.url, demande);
  }

  chargerDemandes() {
    this.http.get<Demande[]>(this.url).subscribe({
      next: (data) => {this.demandes.set(data);},
      error: (err) => console.log(err)
    });
  }
}
