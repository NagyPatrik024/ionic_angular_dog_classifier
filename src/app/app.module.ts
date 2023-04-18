import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule} from '@angular/common/http';
import { AppService } from './shared.service';
// import { Http } from '@angular/http';

@NgModule({
  declarations: [AppComponent, ExampleComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, CommonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  File,
  Camera,
  ImagePicker,
  Crop,
  HTTP,
  AppService 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
