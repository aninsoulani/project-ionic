import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController , LoadingController} from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.page.html',
  styleUrls: ['./edit-menu.page.scss'],
})
export class EditMenuPage implements OnInit {
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
    
  ) { 
    this.route.params.subscribe((params: any) => {
      this.id_makanan = params.id;
      console.log(this.id_makanan);
      this.ambilMakanan(this.id_makanan);
  })}

  ngOnInit() {
  }
  ambilMakanan(id: any){
    this._apiService.ambilMakanan(id).subscribe((res: any) => {
      console.log('sukses', res);
      let makanan = res;
      this.nama_makanan = makanan.nama;
      this.harga = makanan.harga;
      this.id_makanan = makanan.id;
      this.kategori = makanan.kategori;
    },(error: any) => {
      console.log('eror', error);
      alert('gagal');
    })
  }
  editMakanan(){
    let url = this._apiService.apiURL()+'/makanan';
    Http.request({
      method : 'PUT',
      url : url,
      headers : { "Content-Type" : "application/json" },
      data : {
        id : this.id_makanan,
        nama_edit : this.nama_makanan,
        harga_edit : this.harga,
        kategori_edit : this.kategori,
      },
    }).then((data) => {
      this.alertController.create({
        header : 'Notif',
        message : 'berhasil ubah',
        buttons : ['OK'],
      }).then(res => {
        location.reload();
      });
      this.router.navigateByUrl('/menu');
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
}
