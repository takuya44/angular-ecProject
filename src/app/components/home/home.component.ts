import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // 家電製品のカテゴリリスト:publicにしておくことで、テンプレートからアクセスできる
  public categoryList: string[] = [
    'Fridge',
    'Washer',
    'Kitchen',
    'Vacuum',
    'Climate',
    'TV',
    'Other',
  ];

  // 家電製品のリスト
  public productList: Product[] = [
    {
      productId: 1,
      rating: 4,
      productName: 'French Door Fridge',
      category: 'Fridge',
      price: 2200,
      isSale: false,
      releaseDate: '2024-02-01',
      availableQty: 3,
      imageUrl: 'assets/images/1.jpg',
    },
    {
      productId: 2,
      rating: 5,
      productName: 'Side-by-Side Fridge',
      category: 'Fridge',
      price: 1700,
      isSale: false,
      releaseDate: '2023-03-22',
      availableQty: 0,
      imageUrl: 'assets/images/2.jpg',
    },
    {
      productId: 3,
      rating: 3,
      productName: 'Top-Freezer Fridge',
      category: 'Fridge',
      price: 1100,
      isSale: true,
      releaseDate: '2023-01-10',
      availableQty: 5,
      imageUrl: 'assets/images/3.jpg',
    },
    {
      productId: 4,
      rating: 5,
      productName: 'Front Load Washer',
      category: 'Washer',
      price: 800,
      isSale: false,
      releaseDate: '2022-12-30',
      availableQty: 0,
      imageUrl: 'assets/images/4.jpg',
    },
    {
      productId: 5,
      rating: 3,
      productName: 'Top Load Washer',
      category: 'Washer',
      price: 700,
      isSale: true,
      releaseDate: '2023-02-14',
      availableQty: 2,
      imageUrl: 'assets/images/5.jpg',
    },
    {
      productId: 6,
      rating: 1,
      productName: 'OTR Microwave',
      category: 'Kitchen',
      price: 250,
      isSale: false,
      releaseDate: '2023-04-08',
      availableQty: 8,
      imageUrl: 'assets/images/6.jpg',
    },
    {
      productId: 7,
      rating: 3,
      productName: 'Stand Mixer',
      category: 'Kitchen',
      price: 350,
      isSale: true,
      releaseDate: '2023-05-28',
      availableQty: 3,
      imageUrl: 'assets/images/7.jpg',
    },
    {
      productId: 8,
      rating: 2,
      productName: 'High-Power Vacuum',
      category: 'Vacuum',
      price: 450,
      isSale: false,
      releaseDate: '2023-01-17',
      availableQty: 0,
      imageUrl: 'assets/images/8.jpg',
    },
    {
      productId: 9,
      rating: 5,
      productName: 'Robot Vacuum',
      category: 'Vacuum',
      price: 650,
      isSale: true,
      releaseDate: '2023-03-11',
      availableQty: 1,
      imageUrl: 'assets/images/9.jpg',
    },
    {
      productId: 10,
      rating: 1,
      productName: 'Air Purifier & Heater',
      category: 'Climate',
      price: 400,
      isSale: false,
      releaseDate: '2022-11-25',
      availableQty: 2,
      imageUrl: 'assets/images/10.jpg',
    },
    {
      productId: 11,
      rating: 2,
      productName: 'Evaporative Cooler',
      category: 'Climate',
      price: 300,
      isSale: false,
      releaseDate: '2023-02-05',
      availableQty: 4,
      imageUrl: 'assets/images/11.jpg',
    },
    {
      productId: 12,
      rating: 4,
      productName: '65 Inch 4K TV',
      category: 'TV',
      price: 1100,
      isSale: false,
      releaseDate: '2024-04-21',
      availableQty: 7,
      imageUrl: 'assets/images/12.jpg',
    },
    {
      productId: 13,
      rating: 3,
      productName: 'OLED TV',
      category: 'TV',
      price: 2000,
      isSale: false,
      releaseDate: '2023-01-03',
      availableQty: 2,
      imageUrl: 'assets/images/13.jpg',
    },
    {
      productId: 14,
      rating: 2,
      productName: 'Mini TV',
      category: 'TV',
      price: 250,
      isSale: true,
      releaseDate: '2023-01-10',
      availableQty: 5,
      imageUrl: 'assets/images/14.jpg',
    },
    {
      productId: 15,
      rating: 5,
      productName: 'Compact TV',
      category: 'TV',
      price: 300,
      isSale: true,
      releaseDate: '2023-01-10',
      availableQty: 5,
      imageUrl: 'assets/images/15.jpg',
    },
  ];

  /**
   * 状態管理用の変数
   */
  // フィルタリングされた家電製品のリスト
  public filteredProducts: Product[] = [];
  // 選択されたカテゴリ
  public selectedCategory: string = '';

  // コンストラクタ
  constructor() {
    // 新製品のマークを付ける
    this.productList = this.markNewProducts(this.productList);
    // フィルタリングされた家電製品のリストを初期化
    this.filteredProducts = this.productList;
  }

  // カテゴリリストのインデックスを返す：不要なDOM操作が減り、アプリケーションのパフォーマンスが向上
  public trackByIndex(index: number, item: any): number {
    return index;
  }

  /**
   * 新製品のマークを付ける関数
   * 30日以内に発売された製品を新製品としてマークする
   *
   * @param {Product[]} productList - マークを付ける製品のリスト
   * @returns {Product[]} - 新製品としてマークされた製品のリスト
   */
  private markNewProducts(productList: Product[]): Product[] {
    // 基準日を取得
    const releaseDate = new Date('2024-04-01');
    // 3ヶ月前の日付を取得
    const threeMonthsAgo = new Date(releaseDate);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // 製品リストをループして、新製品かどうかを判定
    return productList.map((product) => {
      // 製品の発売日を取得:製品のリリース日をDateオブジェクトに変換
      const releaseDate = new Date(product.releaseDate);
      // 製品のリリース日が3ヶ月以内であれば、新製品としてマーク
      product.isNew = releaseDate > threeMonthsAgo;

      return product;
    });
  }

  /**
   * 別回答
   */
  // private markNewProducts(productList: Product[]): Product[] {
  //   // 製品リストをループして、新製品かどうかを判定
  //   return productList.map((product) => {
  //     // 今日の日付を取得
  //     const today = new Date();
  //     // 製品の発売日を取得
  //     const releaseDate = new Date(product.releaseDate);

  //     // 今日の日付と発売日の差をミリ秒で計算
  //     const timeDiff = Math.abs(today.getTime() - releaseDate.getTime());
  //     // ミリ秒の差を日数に変換
  //     const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  //     // 発売日から30日以内であれば、新製品としてマーク
  //     product.isNew = diffDays <= 30;

  //     return product;
  //   });
  // }

  /**
   * カテゴリを選択したときの処理
   * 選択されたカテゴリと一致する製品のみを抽出する処理
   *
   * @param {string} category - 選択されたカテゴリ
   * @return {void} - なし
   */
  public filterCategory(category: string): void {
    // 選択されたカテゴリがすでに選択されている場合、選択を解除
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.productList;
    } else {
      // 選択されたカテゴリが異なる場合
      // 選択されたカテゴリを保持
      this.selectedCategory = category;

      // 選択されたカテゴリに一致する製品のみを抽出
      this.filteredProducts = this.productList.filter(
        (product) => product.category === category
      );
    }
  }

  /**
   * 製品を並び替える関数
   * 選択されたソートオプションに基づいて製品を並び替える
   *
   * @param {Event} event - イベントオブジェクト
   * @returns {void} - なし
   * */
  public sortProducts(event: Event): void {
    // イベントのターゲット要素を取得
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      // 選択されたソートオプションを取得
      const sortOption = target.value;

      // 選択されたソートオプションに基づいて製品を並び替え
      switch (sortOption) {
        case 'priceAsc':
          // mutableなfilteredProductsを直接変更することで、テンプレートに反映
          this.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          this.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          this.filteredProducts.sort((a, b) => a.productId - b.productId);
          break;
      }
    }
  }
}
