import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ProductService } from './services/product.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title = 'angular-ecProject';

  // DI
  private productService = inject(ProductService);

  // 状態管理
  public isCartVisible: boolean = false;
  public cartItems: Product[] = [];

  private addToCartSubject: Subscription;

  constructor() {
    // カートに追加された商品を購読
    this.addToCartSubject = this.productService.onAddToCart$.subscribe(
      (product) => {
        this.cartItems.push(product);
      }
    );
  }

  public ngOnDestroy(): void {
    // 購読解除
    this.addToCartSubject.unsubscribe();
  }

  // カートの表示切り替え
  public showCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  // カテゴリリストのインデックスを返す：不要なDOM操作が減り、アプリケーションのパフォーマンスが向上
  public trackByIndex(index: number, item: Product): number {
    return index;
  }

  // カートから商品を削除
  public removeProduct(index: number): void {
    this.cartItems.splice(index, 1);
  }
}
