import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
//import { HomePage } from '../home/home';
import { UsuarioPage } from "../usuario/usuario";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    this.login();
  }

  login() {
    console.log("login LoginPage");
    (<any>window).AccountKitPlugin.loginWithPhoneNumber(
      {
        useAccessToken: true,
        defaultCountryCode: "AR",
        facebookNotificationsEnabled: false
      },
      successdata => {
        (<any>window).AccountKitPlugin.getAccount(user => {
          //this.navCtrl.setRoot(HomePage);
          this.storage.set("celular", user.phoneNumber);
          this.storage.set("usuarioFB", user);
          this.storage.get("usuarioApp").then(val => {
            if (val != null) {
              this.navCtrl.setRoot(HomePage);
            } else {
              this.navCtrl.setRoot(UsuarioPage);
            }
          });
        });
      },
      err => {
        alert(err);
      }
    );
  }
}
