import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from "ionic-angular";

/*
  Generated class for the FrenteTodosApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FrenteTodosApiProvider {
  loader: any;
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController) {
    console.log('Hello FrenteTodosApiProvider Provider');
    this.loader = this.loadingCtrl
    .create({
      content: "Por favor espere...",
      dismissOnPageChange: true
    });
  }

  getPersona(ArgMatricula, ArgSexo) {
    return this.http.get('http://api.economiayciencia.com/api/Padrons?matricula=' + ArgMatricula + '&sexo=' + ArgSexo);
  }

  getUsuarioApp(ArgUsuarioAppId) {
    return this.http.get('http://api.economiayciencia.com/api/UsuariosApp/'+ ArgUsuarioAppId);
  }

  postUsuarioApp(postData) {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return new Promise(resolve => {
      this.http.post('http://api.economiayciencia.com/api/UsuariosApp', JSON.stringify(postData), options)
        .subscribe(data => {
          console.dir(data);
          resolve(data);
        });
    });
  }


}
