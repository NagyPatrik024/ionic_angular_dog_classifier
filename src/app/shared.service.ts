import { Injectable } from '@angular/core';
import { Result } from './home/prediction';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class AppService{
    myEmail: string;
    myPassword: string;
    result: Result;

    constructor(private nativeStorage: NativeStorage, private plt: Platform){
      this.myEmail = null;
      this.myPassword = null;
      this.result = null;

      var nativeEmail =  null;
      var nativePw =  null;

      this.plt.ready().then(() => {
        this.nativeStorage.getItem('credentials')
        .then(
          data => { 
            this.setMyEmail(data.email)
            this.setMyPassword(data.pw)
          },
          error => console.error(error)
        );
      });
      
    }

    setMyEmail(val){
      this.myEmail = val;
    }

    getMyEmail(){
      return this.myEmail;
    }

    setMyPassword(val){
      this.myPassword = val;
    }

    getMyPassword(){
      return this.myPassword;
    }

    setMyResult(val){
      this.result = val;
    }

    getMyResult(){
      return this.result;
    }
}