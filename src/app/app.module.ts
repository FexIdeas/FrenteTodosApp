import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { UsuarioPage } from '../pages/usuario/usuario';
import { AvalesPage } from '../pages/avales/avales';
import { MiembrosJuntaPage } from '../pages/miembros-junta/miembros-junta';
import { ContactoPage } from '../pages/contacto/contacto';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Module
import { HttpClientModule } from '@angular/common/http';

//Provider
import { FrenteTodosApiProvider } from '../providers/frente-todos-api/frente-todos-api';

//Ionic
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    UsuarioPage,
    AvalesPage,
    MiembrosJuntaPage,
    ContactoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__frenteTodosDB',
         driverOrder: ['sqlite']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    UsuarioPage,
    AvalesPage,
    MiembrosJuntaPage,
    ContactoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    FrenteTodosApiProvider
  ]
})
export class AppModule { }
