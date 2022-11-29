import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})



export class AppComponent {
  public appPages = [
    { title: 'Menu Utama', url: '/menu', icon: 'home' },
    { title: 'Carts', url: '/carts', icon: 'cart' },  
    { title: 'History Pemesanan', url: '/history', icon: 'sync' },
    { title: 'Logout', url: '/home', icon: 'exit' },
  ];


  constructor() {}
}