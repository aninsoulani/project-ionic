import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController , LoadingController} from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-tambah-menu',
  templateUrl: './tambah-menu.page.html',
  styleUrls: ['./tambah-menu.page.scss'],
})
export class TambahMenuPage implements OnInit {
  id_makanan: any;
  nama_makanan: any;
  harga: any;
  kategori: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }
  tambahMakanan(){
    let url = this._apiService.apiURL()+'/makanan';
    Http.request({
      method : 'POST',
      url : url,
      headers : { "Content-Type" : "application/json" },
      data : {
        nama : this.nama_makanan,
        harga : this.harga,
        kategori : this.kategori,
      },
    }).then((data) => {
      this.alertController.create({
        header : 'Notif',
        message : 'berhasil tambah',
        buttons : ['OK'],
      }).then(res => {
        location.reload();
      });
      this.router.navigateByUrl('/menu');
    }, (err)=>{
      this.alertController.create({
        header: 'Notif',
        message: 'Gagal Tambah',
        buttons : ['OK']
      }).then( res => {
        res.present();
      });

    })
  }
}
