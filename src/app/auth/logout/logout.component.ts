import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared.service';
import { Router } from  "@angular/router";
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {}

  logOut(){
    this.appService.setMyEmail(null)
    this.appService.setMyPassword(null)
    this.nativeStorage.clear()
    alert('Succesful logut!')
    this.router.navigate(['/login']);
  }
}
