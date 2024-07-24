import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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

  // カテゴリリストのインデックスを返す：不要なDOM操作が減り、アプリケーションのパフォーマンスが向上
  public trackByIndex(index: number, item: any): number {
    return index;
  }
}
