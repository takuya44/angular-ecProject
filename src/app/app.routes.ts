import { Routes } from '@angular/router'; // Angularのルーティング機能をインポート
import { HomeComponent } from './components/home/home.component'; // HomeComponentをインポート

// アプリケーションのルート定義
export const routes: Routes = [
  {
    path: '', // ルートパス（http://localhost:4200）
    redirectTo: 'home', // 'home'パスにリダイレクト
    pathMatch: 'full', // 完全一致が必要
  },
  {
    path: 'home', // 'home'パス（http://localhost:4200/home）
    component: HomeComponent, // HomeComponentを表示
  },
];
