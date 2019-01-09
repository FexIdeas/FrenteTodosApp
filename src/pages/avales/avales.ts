import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { FrenteTodosApiProvider } from "../../providers/frente-todos-api/frente-todos-api";
import { LoadingController } from "ionic-angular";

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
  private formGroup: FormGroup;
  public mostrarResultado: boolean = false;
  public personaResultado: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public frenteTodosApiService: FrenteTodosApiProvider,
    public loadingCtrl: LoadingController
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
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AvalesPage");
  }

  consultar() {
    if (this.formGroup.valid) {
      const loader = this.loadingCtrl
      .create({
        content: "Por favor espere...",
        dismissOnPageChange: true
      });
      loader.present();
      this.frenteTodosApiService.getPersona(this.formGroup.controls["dni"].value, this.formGroup.controls["sexo"].value)
      .subscribe(
        (data) => { // Success
          console.log(data);
          loader.dismiss();
          this.personaResultado = data;
          this.mostrarResultado = true;
        },
        (error) =>{
          console.error(error);
        }
      )
    }
  }

  volver() {
    this.mostrarResultado = false;
  }

  marcar() {

  }
}
