import { Component, inject, signal, computed } from '@angular/core';
import { TelephoneService } from '../../services/telephone';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  service = inject(TelephoneService);
  telephones = this.service.telephones;
  nomRecherche = signal('');
  prixMaximum = signal<number | null>(null);

  telephonesFiltres = computed(() => {
    const nom = this.nomRecherche().toLowerCase();
    const prix = this.prixMaximum();

    return this.telephones().filter(tel => (nom === '' || tel.nom.toLowerCase().includes(nom) || tel.marque.toLowerCase().includes(nom)) &&
      (prix === null || tel.prix <= prix)
    );

  });

  rechercherNom(valeur: string) {
    this.nomRecherche.set(valeur);
  }
  rechercherPrix(valeur: string) {
    this.prixMaximum.set(valeur === '' ? null : Number(valeur));
  }
  reinitialiserRecherche() {
    this.nomRecherche.set('');
    this.prixMaximum.set(null);
  }
}