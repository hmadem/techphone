import { Component, inject,computed,signal } from '@angular/core';
import { TelephoneService } from '../../services/telephone';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { Telephone } from '../../models/telephone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-telephones',
  imports: [AdminNavbar,RouterLink],
  templateUrl: './admin-telephones.html',
  styleUrl: './admin-telephones.css'
})
export class AdminTelephones {
  telephoneService = inject(TelephoneService);
  supprimerTelephone(id: string) {
  let reponse = prompt('Voulez-vous vraiment supprimer ce téléphone ?');
  if (reponse == 'oui') {
      this.telephoneService.supprimerTelephone(id);
  }
  }

  recherche = signal('');
  telephonesFiltres = computed(() => {
    const txt = this.recherche().toLowerCase();
    return this.telephoneService.telephones().filter(tel =>
      tel.nom.toLowerCase().includes(txt) ||
      tel.marque.toLowerCase().includes(txt) ||
      tel.modele.toLowerCase().includes(txt)
    );
  });

}