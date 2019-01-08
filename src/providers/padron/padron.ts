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

  postTestServicio(postData) {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
   return new Promise(resolve => {
    this.http.post('http://api.economiayciencia.com/api/TestServicios',JSON.stringify(postData),options)
       .subscribe(data => {
         console.log("data: "+ data);
         resolve(data);
        });
   });


    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
    // const requestOptions = new RequestOptions({ headers: headers });

    // this.http.post("http://api.economiayciencia.com/api/TestServicios", postData, requestOptions)
    //   .subscribe(data => {
    //     console.log(data['_body']);
    //     return "ok";
    //    }, error => {
    //     console.log(error);
    //     return "Error: " + error;
    //   });
  }
}

