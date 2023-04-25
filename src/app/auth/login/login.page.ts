import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/shared.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  baseUrl: string = "http://10.0.2.2:5000";

  constructor(private http: HttpClient, private appService: AppService, private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {
  }


  login(form){
    var formData: any = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);
    
    this.http
    .post(this.baseUrl + '/login', formData)
    .subscribe({
      next: (response) => {
        console.log('login response: ', response['success']);
        if(response['success'] == true){
          this.nativeStorage.setItem('credentials', {email: form.email, pw: form.password})
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );
          this.appService.setMyEmail(form.email)
          this.appService.setMyPassword(form.password)
          console.log('LEKERT Email: '+this.appService.getMyEmail());
          console.log('LEKERT Password: '+this.appService.getMyPassword());
          alert("Successful login!")
          this.router.navigate(['/home']);
        }
        else{
          alert('Login incorrect')
        }
        
    },
      error: (error) => console.log(error),
    });
  }

  ionViewWillEnter(){
    var email = this.appService.getMyEmail();
    var password = this.appService.getMyPassword();
      if(email != null || password != null){
        this.router.navigate(['/logout']);
      }
  }

}
