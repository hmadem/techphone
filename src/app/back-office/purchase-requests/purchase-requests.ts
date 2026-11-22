import { Component, inject } from '@angular/core';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { DemandeService } from '../../services/demande';

@Component({
  selector: 'app-purchase-requests',
  imports: [],
  templateUrl: './purchase-requests.html',
  styleUrl: './purchase-requests.css'
})
export class PurchaseRequests {
  demandeService = inject(DemandeService);
  demandes = this.demandeService.demandes;
  constructor() {
    this.demandeService.chargerDemandes();
  }

}