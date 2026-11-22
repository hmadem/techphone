import { Component, signal, inject } from '@angular/core';
import { TelephoneService } from '../../services/telephone';
import { form, FormField, required, min } from '@angular/forms/signals';

@Component({
  selector: 'app-add-telephone',
  imports: [ FormField],
  templateUrl: './add-telephone.html',
  styleUrl: './add-telephone.css'
})
export class AddTelephone {

  telephoneService = inject(TelephoneService);

  telephoneModel = signal({
    nom: '',
    marque: '',
    modele: '',
    photo: '',
    prix: 0,
    disponible: true,
    dateAjout: new Date().toISOString().slice(0, 10)
  });

  telephoneForm = form(this.telephoneModel, (champ) => {
    required(champ.nom);
    required(champ.marque);
    required(champ.modele);
    required(champ.photo);
    min(champ.prix, 1);
    required(champ.dateAjout);
  });

  ajouterTelephone(event: Event) {
    event.preventDefault();

    if (this.telephoneForm().invalid()) {
      return;
    }

    const nouveauTelephone = {...this.telephoneModel(),
      dateAjout: new Date(this.telephoneModel().dateAjout),
      commentaires: []
    };

    this.telephoneService.ajouterTelephone(nouveauTelephone);
  }
}