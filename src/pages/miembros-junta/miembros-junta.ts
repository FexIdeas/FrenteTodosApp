import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MiembrosJuntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-miembros-junta',
  templateUrl: 'miembros-junta.html',
})
export class MiembrosJuntaPage {
  foto: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.foto = "../../assets/imgs/logoFrenteTodos.png"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiembrosJuntaPage');
  }

}
