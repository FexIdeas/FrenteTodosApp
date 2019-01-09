import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FrenteTodosApiProvider } from "../../providers/frente-todos-api/frente-todos-api";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";
import { HomePage } from "../home/home";

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-usuario",
  templateUrl: "usuario.html"
})
export class UsuarioPage {
  private formGroup: FormGroup;
  foto: any = null;
  celular: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public frenteTodosApiService: FrenteTodosApiProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.formGroup = this.formBuilder.group({
      apellido: ["", Validators.compose([Validators.required])],
      nombre: ["", Validators.compose([Validators.required])],
      dni: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8)
        ])
      ]
    });

    this.storage.get("celular").then(val => {
      this.celular = val;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UsuarioPage");
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.foto = "data:image/jpeg;base64," + imageData;
      },
      err => {
        // Handle error
      }
    );
  }

  guardar() {
    if (!this.formGroup.valid || this.foto == null) {
      let toast = this.toastCtrl.create({
        message: "Por Favor Completar Los Datos Obligatorios",
        duration: 3000,
        position: "top"
      });
      toast.present();
    } else {
      const loader = this.loadingCtrl
        .create({
          content: "Por favor espere...",
          dismissOnPageChange: true
        });
        loader.present();
      let postData = {
        Apellido: this.formGroup.controls["apellido"].value,
        Nombre: this.formGroup.controls["nombre"].value,
        DNI: this.formGroup.controls["dni"].value,
        Celular: this.celular,
        Foto: this.foto
      };

      this.frenteTodosApiService.postUsuarioApp(postData).then(
        data => {
          // Success
          this.storage.set("usuarioApp", postData);
          this.navCtrl.setRoot(HomePage);
          loader.dismiss();
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
