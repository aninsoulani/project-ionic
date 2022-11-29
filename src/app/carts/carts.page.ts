import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';


@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage implements OnInit {
  harga_akhir: any;
  harga_satuan: any;
  id_carts: any;
  id_makanan: any;
  jumlah_pesanan: any;
  kategori_makanan: any;
  total_harga: any;
  total_jenis_barang: any;
  total_pesanan: any;
  nama_makanan: any;
  nama_user: any;
  list_carts: any[] = [];

  constructor(
    public _apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) { 
    this.getCarts();
  }

  ngOnInit() {
    console.log("cek fungsi halaman event");
    this.nama_user = this._apiService.loadToken();
  }

  ionViewDidLoad() {
    console.log("Jika selesai loading");
    this.getCarts();
  }


  getCarts(){
    this._apiService.getCarts().subscribe((res: any)=> {
      console.log('sukses', res);
      this.list_carts = res['carts'];
      let total = res['meta'];
      this.total_harga = total.total_harga;
      this.total_jenis_barang = total.total_jenis_barang;
      this.total_pesanan = total.total_pesanan;
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

  deleteCarts(id: any){
    this.alertController.create({
      header : 'Hapus data',
      message: 'Yakin hapus data carts?',
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
            

            this._apiService.deleteCarts(id);
            console.log('tes');

    }}]
    }).then(res => {
      res.present();
    })
  }
  editCarts(id: any){
    let url = this._apiService.apiURL()+'/carts';
    Http.request({
      method : 'PUT',
      url : url,
      headers : { "Content-Type" : "application/json" },
      data : {
        id: id,
        pesanan_baru : this.jumlah_pesanan,
      },
    }).then((data) => {
      this.alertController.create({
        header : 'Notif',
        message : 'berhasil ubah',
        buttons : ['OK'],
      }).then(res => {
        location.reload();
      });
      this.router.navigateByUrl('/carts');
    }, (err)=>{
      this.alertController.create({
        header: 'Notif',
        message: 'Gagal Edit',
        buttons : ['OK']
      }).then( res => {
        res.present();
      });

    })
  }
  resetCarts(){
    this.alertController.create({
      header : 'Hapus data',
      message: 'Yakin hapus semua data carts?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan')
          }
        },
        {
          text: 'Reset',
          handler: (data: any) => {
            // jika ditekan
            

            this._apiService.resetCarts();
            console.log('tes');

    }}]
    }).then(res => {
      res.present();
    })
  }
  confirmCarts(){
    this.alertController.create({
      header : 'Konfirmasi Pesanan',
      message: 'Yakin lakukan transaksi? Semua data akan masuk history',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan')
          }
        },
        {
          text: 'Konfirmasi',
          handler: (data: any) => {
            // jika ditekan
            

            this._apiService.confirmCarts();
            console.log('tes');

    }}]
    }).then(res => {
      res.present();
    })
  }
}
