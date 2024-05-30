import { Component, OnInit } from '@angular/core';
import { ProdManagementComponent } from '../../components/prod-management/prod-management.component';

@Component({
  standalone: true,
  imports: [ProdManagementComponent],
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {

}
