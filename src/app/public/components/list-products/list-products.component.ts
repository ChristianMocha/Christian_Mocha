import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/services/product.service';
import { LoadingComponent } from '../loading/loading.component';
import { ProductFilterPipe } from 'src/app/core/pipes/product-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ProductPipesModule } from 'src/app/core/pipes/product-pipes.module';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoadingComponent, FormsModule, ProductPipesModule, SkeletonComponent],
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {

  lstProducts: Product[] = [];
  allProducts: Product[] = [];
  displayModal: boolean = false;
  loading: boolean = false;
  loadingData: boolean = false;
  productSelect: any;
  searchTerm: any;

  pageSize: number = 5;
  currentPage: number = 1;
  totalProducts: number = 0;
  totalPages: number = 0;

  constructor(
    private _router: Router,
    private productService: ProductService
  ) {
  }
  
  
  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    this.loadingData = true;
    try {
      const resp: any = await firstValueFrom(this.productService.getProducts());
      this.allProducts = resp.data;
      this.updateProductList();
      this.loadingData = false;
    } catch (error) {
      this.loadingData = false;
      console.log(error);
    }
  }
  updateProductList() {
    this.lstProducts = this.allProducts.slice(0, this.pageSize);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateProductList();
  }

  pm() {
    this._router.navigate(['PM']);
  }

  editItem(acc: any) {
    const jsonString = JSON.stringify(acc);
    const data = btoa(jsonString);
    this._router.navigate(['PM'], { queryParams: { data: data } })
  }
  
  deleteItem(acc:any) {
    this.productSelect = acc;
    this.displayModal = true;
  }

  async confirmDelete() {
    this.loading = true;
    try {
      const resp: any = await firstValueFrom(this.productService.deleteProduct(this.productSelect.id));
      console.log(resp);
      this.getProducts();
      this.closeModal();

      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  closeModal() {
    this.displayModal = false;
  }


}
