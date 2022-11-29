import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  nama: any;
  harga: any;
  kategori: any;
  nama_user: any;
  makananlist: any[] = [];

  // tambah carts
  id: any;
  jumlah_pesanan: any;

  constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) { 
    this.getMakanan();
  }

  ngOnInit() {
    console.log("cek fungsi halaman event");
    this.nama_user = this._apiService.loadToken();
  }

  ionViewDidLoad() {
    console.log("Jika selesai loading");
    this.getMakanan();
  }


  getMakanan(){
    this._apiService.getMakanan().subscribe((res: any)=> {
      console.log('sukses', res);
      this.makananlist = res;
    }, (error: any) => {
      console.log('gagal', error);
      this.alertController.create({
        header: 'Notif',
        message: 'Gagal',
        buttons: ['OK']
      }).then( res => {
        res.present();
      })
    }
    )
  }

  deleteMakanan(id: any){
    this.alertController.create({
      header : 'Hapus data',
      message: 'Yakin hapus data makanan?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan')
          }
        },
        {
          text: 'Hapus Gas',
          handler: (data: any) => {
            // jika ditekan
            

            this._apiService.deleteMakanan(id);
            console.log('tes');

    }}]
    }).then(res => {
      res.present();
    })
  }



  // tambah ke carts
  tambahCarts(id: any){
    let url = this._apiService.apiURL()+'/carts';
    Http.request({
      method : 'POST',
      url : url,
      headers : { "Content-Type" : "application/json" },
      data : {
        id : id,
        jumlah_pesanan : this.jumlah_pesanan
      }
    }).then((data) => {
      console.log(data['data']);
      this.jumlah_pesanan = null;
      let status = data['data']['status'];
      if (status == 'success'){
      this.alertController.create({
        header: 'Notif',
        message: 'Barang berhasil ditambahkan kedalam Cart',
        buttons: ['OK']
      }).then( res => {
        res.present();
      })}
      else if (status == 'error') {
        this.alertController.create({
          header: 'Notif',
          message: 'Gagal, Barang sudah ada di Cart',
          buttons: ['OK']
        }).then( res => {
          res.present();
        })

      }
    })
  }






}
