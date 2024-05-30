import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'PM',
        component: ProductManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
