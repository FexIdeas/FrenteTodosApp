import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];
test: string;
  constructor(public navCtrl: NavController,
    public userService: UserServiceProvider) {
      this.test = "ok";
    this.userService.getUsers()
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  logout() {
    console.log('logout');
    (<any>window).AccountKitPlugin.logout()
    this.navCtrl.setRoot(LoginPage);
  }
}
