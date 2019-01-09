import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];
  persona: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
  //   this.userService.getUsers()
  //   .subscribe(
  //     (data) => { // Success
  //       console.log(data);
  //       this.users = data['results'];
  //     },
  //     (error) =>{
  //       console.error(error);
  //     }
  //   )

  // this.padronService.getPersona(33462776,'M')
  //     .subscribe(
  //       (data) => { // Success
  //         console.log(data);
  //         this.persona = data;
  //       },
  //       (error) =>{
  //         console.error(error);
  //       }
  //     )
  }
  logout() {
    console.log('logout');
    (<any>window).AccountKitPlugin.logout()
    this.navCtrl.setRoot(LoginPage);
  }
}
