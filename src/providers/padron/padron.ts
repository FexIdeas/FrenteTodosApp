import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PadronProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PadronProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PadronProvider Provider');
  }
  getPersona(ArgMatricula, ArgSexo) {
    return this.http.get('http://api.economiayciencia.com/api/Padrons?matricula='+ArgMatricula+'&sexo='+ArgSexo);
  }

}

