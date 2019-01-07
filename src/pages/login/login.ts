import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
 
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.login();
  }
 
  login() {
    console.log('login LoginPage');
    (<any>window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
	    defaultCountryCode: "AR",
      facebookNotificationsEnabled: false
    }, (successdata) => {
      (<any>window).AccountKitPlugin.getAccount((user) => {
        this.navCtrl.setRoot(HomePage);
      })
      }, (err) => {
        alert(err);
    })
  }
 
}