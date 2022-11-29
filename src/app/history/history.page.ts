import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  desc_pesanan: any;
  nama_user: any;
  id_history: any;
  jml_jenis_barang: any;
  jml_total_barang: any;
  total_harga_order: any;
  waktu_order: any;
  makananlist: any[] = [];
  constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) { 
    this.getHistory();
  }

  ngOnInit() {
    this.nama_user = this._apiService.loadToken();
  }


  getHistory(){
    this._apiService.getHistory().subscribe((res: any)=> {
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
}
