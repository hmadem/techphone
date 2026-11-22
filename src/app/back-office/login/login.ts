import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {form,FormField,required} from '@angular/forms/signals';
import { AdministrateurService } from '../../services/administrateur';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  adminService = inject(AdministrateurService);
  router = inject(Router);
  erreur = signal('');
  loginModel = signal({email: '',motDePasse: ''});
  loginForm = form(this.loginModel, (champ) => {required(champ.email);required(champ.motDePasse);});

  connecter(event: Event) {
    event.preventDefault();
    if (this.loginForm().invalid()) {
      return;
    }
    this.adminService.verifierConnexion(this.loginModel().email,this.loginModel().motDePasse).subscribe({
      next: (admin) => {
        if (admin) {
          this.adminService.adminConnecte = admin;
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.erreur.set('Email ou mot de passe incorrect !');
        }
      },
      error: (err) => {
        console.error(err);
        this.erreur.set('Erreur de connexion au serveur.');
      }
    });
  }
}