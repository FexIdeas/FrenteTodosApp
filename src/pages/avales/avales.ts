import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { FrenteTodosApiProvider } from "../../providers/frente-todos-api/frente-todos-api";
import { LoadingController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the AvalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-avales",
  templateUrl: "avales.html"
})
export class AvalesPage {
  public formGroup: FormGroup;
  public formGroupMarcar: FormGroup;
  public mostrarBuscador: boolean = true;
  public mostrarResultado: boolean = false;
  public mostrarMarcar: boolean = false;
  public personaResultado: any;
  public usuarioApp: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public frenteTodosApiService: FrenteTodosApiProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.formGroup = this.formBuilder.group({
      dni: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8)
        ])
      ],
      sexo: ["", Validators.compose([Validators.required])]
    });

    this.formGroupMarcar = this.formBuilder.group({
      municipio: ["", Validators.compose([Validators.required])],
      lista: ["", Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AvalesPage");
    this.storage.get("usuarioApp").then(val => {
      this.usuarioApp = val;
    });
    this.storage.get("celular").then(val => {
      console.dir(val);
    });
  }

  consultar() {
    if (!this.formGroup.valid) {
      let toast = this.toastCtrl.create({
        message: "Por favor completar los datos obligatorios",
        duration: 3000,
        position: "top"
      });
      toast.present();
    } else {
      const loader = this.loadingCtrl.create({
        content: "Por favor espere...",
        dismissOnPageChange: true
      });
      loader.present();
      this.frenteTodosApiService
        .getPersona(
          this.formGroup.controls["dni"].value,
          this.formGroup.controls["sexo"].value
        )
        .subscribe(
          data => {
            // Success
            loader.dismiss();
            this.personaResultado = data;
            this.mostrarBuscador = false;
            this.mostrarResultado = true;
            this.mostrarMarcar = false;
          },
          error => {
            loader.dismiss();
            console.error(error);
            let toast = this.toastCtrl.create({
              message:
                "No está en el padrón. Verifique si los datos son correctos",
              duration: 3000,
              position: "top"
            });
            toast.present();
          }
        );
    }
  }

  volverBuscador() {
    this.mostrarBuscador = true;
    this.mostrarResultado = false;
    this.mostrarMarcar = false;
  }

  marcar() {
    this.mostrarBuscador = false;
    this.mostrarResultado = false;
    this.mostrarMarcar = true;
  }

  volverResultado() {
    this.mostrarBuscador = false;
    this.mostrarResultado = true;
    this.mostrarMarcar = false;
  }

  guardarMarcar() {
    if (!this.formGroupMarcar.valid) {
      let toast = this.toastCtrl.create({
        message: "Por favor completar los datos obligatorios",
        duration: 3000,
        position: "top"
      });
      toast.present();
    } else {
      const loader = this.loadingCtrl.create({
        content: "Por favor espere...",
        dismissOnPageChange: true
      });
      loader.present();

      let postData = {
        padronID: this.personaResultado.Persona.ID,
        municipioID: this.formGroupMarcar.controls["municipio"].value,
        lista: this.formGroupMarcar.controls["lista"].value,
        usuarioAppIDAlta: this.usuarioApp.ID
      };
        console.log(postData);
      this.frenteTodosApiService.postAval(postData).then(
        data => {
          // Success
          loader.dismiss();
          this.presentAlert();
        },
        error => {
          loader.dismiss();
          console.error(error);
        }
      );
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "Aval",
      subTitle: "Guardado correctamente.",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            // user has clicked the alert button
            // begin the alert's dismiss transition
            let navTransition = alert.dismiss();

            navTransition.then(() => {
              this.navCtrl.pop();
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  
}
