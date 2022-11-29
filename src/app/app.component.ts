import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Menu Utama', url: '/menu', icon: 'home' },
    { title: 'Tambah Menu', url: '/tambah-menu', icon: 'restaurant' },
    { title: 'Carts', url: '/carts', icon: 'cart' },
    //{ title: 'Carts', url: '/dashboard', icon: 'person' }
    //{ title: 'History Pemesanan', url: '/menu', icon: 'archive' },
    //{ title: 'Logout', url: '/menu', icon: 'archive' },
  ];

  constructor() {}
}