import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FrenteTodosApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FrenteTodosApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FrenteTodosApiProvider Provider');
  }

  getPersona(ArgMatricula, ArgSexo) {
    return this.http.get('http://api.economiayciencia.com/api/Padrons?matricula=' + ArgMatricula + '&sexo=' + ArgSexo);
  }

  postTestServicio(postData) {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return new Promise(resolve => {
      this.http.post('http://api.economiayciencia.com/api/TestServicios', JSON.stringify(postData), options)
        .subscribe(data => {
          resolve(data);
        });
    });
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
