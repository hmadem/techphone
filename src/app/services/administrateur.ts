import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Administrateur } from '../models/administrateur';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {
  http = inject(HttpClient);
  url = 'http://localhost:3300/administrateurs';
  adminConnecte: Administrateur | null = null;
  
  verifierConnexion(email: string, motDePasse: string) {
    return this.http.get<Administrateur[]>(this.url).pipe(
      map(administrateurs =>administrateurs.find(admin =>admin.email === email && admin.motDePasse === motDePasse
        )
      )
    );
  }
  modifierMotDePasse(id: string, motDePasse: string) {
    return this.http.put<Administrateur>(`${this.url}/${id}`,{ motDePasse: motDePasse });
  }

}