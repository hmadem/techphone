import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormField, form, required, min } from '@angular/forms/signals';

import { TelephoneService } from '../../services/telephone';
import { Telephone } from '../../models/telephone';

@Component({
  selector: 'app-edit-telephone',
  imports: [FormField],
  templateUrl: './edit-telephone.html',
  styleUrl: './edit-telephone.css'
})
export class EditTelephone implements OnInit {

  telephoneService = inject(TelephoneService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  telephoneOriginal = signal<Telephone | null>(null);

  telephoneModel = signal({ nom: '', marque: '', modele: '', photo: '', prix: 0, disponible: true, dateAjout: '' });

  telephoneForm = form(this.telephoneModel, (champ) => {
    required(champ.nom);
    required(champ.marque);
    required(champ.modele);
    required(champ.photo);
    min(champ.prix, 1);
    required(champ.dateAjout);
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.telephoneService.obtenirTelephone(id).subscribe({
        next: (tel) => {
          this.telephoneOriginal.set(tel);
          this.telephoneModel.set({
            nom: tel.nom,
            marque: tel.marque,
            modele: tel.modele,
            photo: tel.photo,
            prix: tel.prix,
            disponible: tel.disponible,
            dateAjout: new Date(tel.dateAjout).toISOString().slice(0, 10)
          });
        },
        error: () => {
          alert('Téléphone introuvable.');
          this.router.navigate(['/admin/telephones']);
        }
      });
    }
  }

  modifierTelephone(event: Event) {
    event.preventDefault();
    const original = this.telephoneOriginal();

    if (this.telephoneForm().invalid() || !original) {
      return;
    }

    const telephoneModifie: Telephone = {...original,...this.telephoneModel(),
      dateAjout: new Date(this.telephoneModel().dateAjout)
    };

    this.telephoneService.modifierTelephone(telephoneModifie).subscribe({
      next: () => {
        alert('Téléphone modifié avec succès !');
        this.telephoneService.chargerTelephones();
        this.router.navigate(['/admin/telephones']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur de modification.');
      }
    });
  }
}