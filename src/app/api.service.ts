import { Injectable } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@capacitor-community/http';
import { AlertController } from '@ionic/angular';


import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  nama: any; //init variable nama untuk namauser
  token: any;
  constructor(
    public http: HttpClient,
    private alertController: AlertController,
    private authService: AuthenticationService,
    private router: Router
  ) { }





  //membuat fungsi logout
  logout() {
    this.authService.logout(); // lempar ke authService lalu cari fungsi logout
    this.router.navigateByUrl('/', { replaceUrl: true }); // alihkan ke halama
  }



  // link ApiService
  apiURL(){
    return 'https://kasir-api-project-mobile.herokuapp.com/api/kasir';
  }

  getMakanan(){
    return this.http.get(this.apiURL()+'/makanan');
  }

  deleteMakanan(id: any){
    return Http.request({
      method : 'DELETE',
      url: this.apiURL()+'/makanan',
      headers: { 'Content-Type': 'application/json'},
      data: {
        id: id,
      }
    }).then((data) => {
      console.log(data);
      if (data['data']['success']) {
        console.log('berhasil hapus');
        location.reload();
      } else {
        this.alertController.create({
          header: 'Notif',
          message: 'Gagal',
          buttons: ['OK']
        }).then( res => {
          res.present();
        });
      }
    })
  }
  ambilMakanan(id: any){
    return this.http.get(this.apiURL()+'/makanan/'+id);
  }

  getCarts(){
    return this.http.get(this.apiURL()+'/carts');
  }

  deleteCarts(id: any){
    return Http.request({
      method : 'DELETE',
      url: this.apiURL()+'/carts',
      headers: { 'Content-Type': 'application/json'},
      data: {
        id: id,
      }
    }).then((data) => {
      console.log(data);
      if (data['data']['success']) {
        console.log('berhasil hapus');
        location.reload();
      } else {
        this.alertController.create({
          header: 'Notif',
          message: 'Gagal',
          buttons: ['OK']
        }).then( res => {
          res.present();
        });
      }
    })
  }
  resetCarts(){
    return Http.request({
      method : 'DELETE',
      url: this.apiURL()+'/carts/reset',
      headers: { 'Content-Type': 'application/json'},
      data: {
      }
    }).then((data) => {
      console.log(data);
      if (data['data']['success']) {
        console.log('berhasil reset');
        location.reload();
      } else {
        this.alertController.create({
          header: 'Notif',
          message: 'Gagal',
          buttons: ['OK']
        }).then( res => {
          res.present();
        });
      }
    })
  }
  confirmCarts(){
    return Http.request({
      method : 'POST',
      url: this.apiURL()+'/transaksi',
      headers: { 'Content-Type': 'application/json'},
      data: {
      }
    }).then((data) => {
      console.log(data);
      if (data['data']['success']) {
        console.log('berhasil mengkonfirmasi pesanan');
        location.reload();
      } else {
        this.alertController.create({
          header: 'Notif',
          message: 'Gagal',
          buttons: ['OK']
        }).then( res => {
          res.present();
        });
      }
    })
  }
  getHistory(){
    return this.http.get(this.apiURL()+'/histori');
  }

  loadToken() {
    this.token = this.authService.getData('token');
    if (this.token != null) {
      this.nama = this.authService.getData('nama');
      return this.nama;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
