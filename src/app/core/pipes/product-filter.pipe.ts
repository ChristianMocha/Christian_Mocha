import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';


@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products;
    }

    return products.filter(product => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
