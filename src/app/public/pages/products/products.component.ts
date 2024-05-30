import { Component } from '@angular/core';
import { ListProductsComponent } from '../../components/list-products/list-products.component';

@Component({
  standalone: true,
  imports: [ListProductsComponent],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

}
