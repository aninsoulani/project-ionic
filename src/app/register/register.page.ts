import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertController , LoadingController} from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class RegisterPage implements OnInit {

  nama_user : any;
  password: any;
  password_konfir: any;
  username: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,) { }

  ngOnInit() {
  }

  tambahUser(){
    let url = this._apiService.apiURL()+'/user';
    Http.request({
      method : 'POST',
      url : url,
      headers : { "Content-Type" : "application/json" },
      data : {
        nama : this.nama_user,
        password : this.password,
        password_konfir : this.password_konfir,
        username : this.username,
      },
    }).then((data) => {
      
      let status = data['data']['status'];
      if (status == 'success'){
        this.alertController.create({
          header: 'Notif',
          message: 'Barang berhasil ditambahkan kedalam Cart',
          buttons: ['OK']
        }).then( res => {
          res.present();
        })}
        else {
          this.alertController.create({
            header: 'Notif',
            message: 'Gagal membuat user',
            buttons: ['OK']
          }).then( res => {
            res.present();
          })
  
        }})
  }
}
