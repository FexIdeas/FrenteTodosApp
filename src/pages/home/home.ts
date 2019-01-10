import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { FrenteTodosApiProvider } from "../../providers/frente-todos-api/frente-todos-api";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  users: any[] = [];
  persona: any;
  foto: any = null;
  celular: any;

  constructor(
    public navCtrl: NavController,
    public frenteTodosApiService: FrenteTodosApiProvider,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    this.frenteTodosApiService.getUsuarioApp(1).subscribe(
      data => {
        // Success
        this.foto = data["Foto"];
      },
      error => {}
    );
    this.storage.get("celular").then(val => {
      this.celular = val;
    });
  }
  logout() {
    console.log("logout");
    (<any>window).AccountKitPlugin.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
