import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  constructor(
    public _apiService: ApiService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) {}
  ngOnInit() {}


  login(){
    let url = this._apiService.apiURL()+'/user/login';
    Http.request({
      method : 'POST',
      url : url,
      headers : { "Content-Type" : "application/json" },
      data : {
        username: this.username,  
        password: this.password,
      },
    }).then((data) => {
      console.log(data)
      console.log(data['data']['success'])
      if (data['data']['success']) {
        this.authService.saveData('token', data['data']['success'].token);
        this.authService.saveData('username', data['data']['success'].username);
        this.username = null;
        this.password = null;
        this.router.navigateByUrl('/menu');
      } else {
        this.authService.notifikasi('Username dan Password Salah');
      }
    
      //this.router.navigateByUrl('/login');
    }, (err)=>{
      this.alertController.create({
        header: 'Notif',
        message: 'Gagal login',
        buttons : ['OK']
      }).then( res => {
        res.present();
      });

    })
  }


  prosesLogin(): void {
    if (this.username != null && this.password != null) {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.authService.postMethod(data, 'https://kasir-api-project-mobile.herokuapp.com/api/kasir/user/login').subscribe({
        next: (hasil) => {
          console.log(hasil);

          if (hasil['data']['success']) {
            this.authService.saveData('token', hasil['data']['success'].token);
            this.authService.saveData('username', hasil['data']['success'].username);
            this.username = null;
            this.password = null;
            this.router.navigateByUrl('/menu');
          } else {
            this.authService.notifikasi('Username dan Password Salah');
          }
        },
        error: (e) => {
          this.authService.notifikasi('Gagal Login, periksa koneksi internet');
        },
      });
    } else {
      this.authService.notifikasi('Username dan Password Tidak Boleh Kosong');
    }
  }
}
