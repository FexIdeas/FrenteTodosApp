import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Market } from '@ionic-native/market';
import { AppVersion } from '@ionic-native/app-version';
import { FrenteTodosApiProvider } from "../../providers/frente-todos-api/frente-todos-api";
import { AlertController } from 'ionic-angular';
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
    private storage: Storage,
    private market: Market,
    private appVersion: AppVersion,
    public alertCtrl: AlertController,
    public frenteTodosApiService: FrenteTodosApiProvider
  ) {
    //TODO: Servicio que consulte version de la app en playstore
    this.frenteTodosApiService.getUsuarioApp(1).subscribe(
      data => {
        // Success    
        appVersion.getVersionNumber().then(val => {
          if (val != data) {
            this.mostrarAvisoActualizar();
          }
          else {
            this.login();
          }
        });
      },
      error => { }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
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

  mostrarAvisoActualizar() {
    const confirm = this.alertCtrl.create({
      title: 'Actualizar App',
      message: 'Hay una nueva versión de la aplicación, es necesario actualizar.',
      buttons: [
        {
          text: 'Actualizar',
          handler: () => {
            console.log('Agree clicked');
            this.market.open('io.frente.todos');
          }
        }
      ]
    });
    confirm.present();
  }
}
