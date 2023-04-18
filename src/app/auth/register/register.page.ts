import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  baseUrl: string = "http://10.0.2.2:5000";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  register(form) {

    var formData: any = new FormData();
    console.log('Form name: ', form.name)
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);

    this.http
    .post(this.baseUrl + '/signup', formData)
    .subscribe({
      next: (response) => {
        console.log('register response: ', response['success']);
        if(response['success'] == true){
          this.router.navigate(['/login']);
        }
        else{
        alert('Register incorrect');
        }
        
    },
      error: (error) => console.log(error),
    });

  }

}
