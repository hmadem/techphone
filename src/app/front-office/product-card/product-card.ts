import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Telephone } from '../../models/telephone';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  telephone = input.required<Telephone>();
}