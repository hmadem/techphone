import { Component, inject, signal, computed } from '@angular/core';
import { TelephoneService } from '../../services/telephone';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [],
  templateUrl: './compare.html',
  styleUrl: './compare.css'
})
export class Compare {

  service = inject(TelephoneService);
  selectedids = signal<string[]>([]);

  selectedTelephones = computed(() =>
    this.service.telephones().filter(tel =>
      this.selectedids().includes(tel.id)
    )
  );

  gererSelectionTelephone(id: string) {

    if (this.selectedids().includes(id)) {

      this.selectedids.update(list =>
        list.filter(item => item !== id)
      );

    } else {

      this.selectedids.update(list => [...list, id]);

    }

  }

  isSelected(id: string): boolean {
    return this.selectedids().includes(id);
  }

}