import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  nama: any;
  harga: any;
  kategori: any;
  makananlist: any[] = [];

  constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) { 
    this.getMakanan();
  }

  ngOnInit() {
    console.log("cek fungsi halaman event");
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
}
