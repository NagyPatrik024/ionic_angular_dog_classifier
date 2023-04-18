import { Injectable } from '@angular/core';

@Injectable()
export class AppService{
    myEmail;
    myPassword;

    constructor(){
      this.myEmail = null;
      this.myPassword = null;
    }

    setMyEmail(val: string){
      this.myEmail = val;
    }

    getMyEmail(){
      return this.myEmail;
    }

    setMyPassword(val: string){
      this.myPassword = val;
    }

    getMyPassword(){
      return this.myPassword;
    }
}