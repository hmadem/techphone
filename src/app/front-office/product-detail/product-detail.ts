import { Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelephoneService } from '../../services/telephone';
import { DatePipe } from '@angular/common';
import { form, FormField, required, email, min } from '@angular/forms/signals';
import { DemandeService } from '../../services/demande';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [DatePipe, FormField,FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  route = inject(ActivatedRoute);
  service = inject(TelephoneService);
  demandeService = inject(DemandeService);

  afficherFormulaire = signal(false);

  telephone = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return this.service.telephones().find(tel => tel.id === id);
  });

  commandeModel = signal({nomClient: '',emailClient: '',telephoneClient: '',adresseClient: '',quantite: 1});
  commandeForm = form(this.commandeModel, (champ) => {required(champ.nomClient);
    required(champ.emailClient);
    required(champ.emailClient);
    required(champ.telephoneClient);
    required(champ.adresseClient);
    min(champ.quantite, 1);
  });

  ouvrirFormulaire() {
    this.afficherFormulaire.set(true);
  }

  commander() {
    const tel = this.telephone();
    if (!tel) {
      return;
    }

    if (this.commandeForm().invalid()) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const nouvelleDemande = {
      id: "",
      nomClient: this.commandeModel().nomClient,
      emailClient: this.commandeModel().emailClient,
      telephoneClient: this.commandeModel().telephoneClient,
      adresseClient: this.commandeModel().adresseClient,
      telephoneId: tel.id,
      nomTelephone: tel.nom,
      prix: tel.prix,
      quantite: this.commandeModel().quantite,
      date: new Date().toISOString().slice(0, 10),
      statut: 'En attente'
    };

    this.demandeService.ajouterDemande(nouvelleDemande).subscribe({
        next: () => {
          alert('Votre commande a été envoyée avec succès !');
          this.afficherFormulaire.set(false);
          this.commandeModel.set({
            nomClient: '',
            emailClient: '',
            telephoneClient: '',
            adresseClient: '',
            quantite: 1
          });
        },
        error: (err) => {
          console.log(err);
          alert('Erreur lors de la commande');
        }
      });
  }
}
