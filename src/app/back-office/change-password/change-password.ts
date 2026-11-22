
import { Component, inject, signal } from '@angular/core';
import { AdministrateurService } from '../../services/administrateur';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-change-password',
  imports: [FormField],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {

  adminService = inject(AdministrateurService);
  message = signal('');
  erreur = signal('');
  passwordModel = signal({ ancienMotDePasse: '', nouveauMotDePasse: '', confirmerMotDePasse: '' });
  passwordForm = form(this.passwordModel, (champ) => {
    required(champ.ancienMotDePasse);
    required(champ.nouveauMotDePasse);
    required(champ.confirmerMotDePasse);
  });

  changerMotDePasse() {
    if (this.passwordForm().invalid()) {
      return;
    }

    const admin = this.adminService.adminConnecte;

    if (!admin) {
      this.erreur.set('Administrateur non connecté !');
      return;
    }

    if (this.passwordModel().ancienMotDePasse !== admin.motDePasse) {
      this.erreur.set('Ancien mot de passe incorrect !');
      return;
    }

    if (this.passwordModel().nouveauMotDePasse !== this.passwordModel().confirmerMotDePasse) {
      this.erreur.set('Les mots de passe ne correspondent pas !');
      return;
    }

    this.adminService.modifierMotDePasse(admin.id,this.passwordModel().nouveauMotDePasse).subscribe({
      next: () => {
        admin.motDePasse = this.passwordModel().nouveauMotDePasse;
        this.adminService.adminConnecte = admin;
        this.message.set('Mot de passe modifié avec succès !');
        this.erreur.set('');
        this.passwordModel.set({ ancienMotDePasse: '', nouveauMotDePasse: '', confirmerMotDePasse: '' });
      },
      error: (err) => {
        console.error(err);
        this.erreur.set('Erreur lors de la modification !');
      }
    });
  }
}
