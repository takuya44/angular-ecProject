import { Component, Input, Inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  // 親コンポーネントから受け取るプロパティ
  @Input() product!: Product;

  // ProductServiceをDI
  private productService = Inject(ProductService);

  // カートに商品を追加する
  public addToCart(addedProduct: Product): void {
    this.productService.onAddToCart$.next(addedProduct);
  }
}
