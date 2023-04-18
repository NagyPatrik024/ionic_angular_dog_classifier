import { Injectable } from '@angular/core';
import { Result } from './home/prediction';

@Injectable()
export class AppService{
    myEmail: string;
    myPassword: string;
    result: Result;

    constructor(){
      this.myEmail = null;
      this.myPassword = null;
      this.result = null
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

    setMyResult(val: Result){
      this.result = val;
    }

    getMyResult(){
      return this.result;
    }
}