/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable object-shorthand */
import { Component, NgZone, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx';
import { Prediction, Result } from './prediction';
import { AppService } from '../shared.service';
import { Router } from '@angular/router';
// import {Http} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  imageurl: any;
  securepath: any = window;
  urlWeb: string = "http://10.0.2.2:5000/predict";
  result: Result = null;
  imageurlresult: any;
  email: string;
  password: string;

  imageOptions: CropOptions ={
    quality: 80,
    targetWidth: -1,
    targetHeight: -1
  };

  constructor(private ngZone: NgZone,
    private actionsheet: ActionSheetController,
    private camera: Camera,
    private file: File,
    private http: HTTP,
    private loading: LoadingController,
    private imagepicker: ImagePicker,
    private crop: Crop,
    private domsanitize: DomSanitizer,
    private appService: AppService,
    private router: Router) {
      this.result = null;
      this.email = this.appService.getMyEmail();
      this.password = this.appService.getMyPassword();
      if(this.email == null || this.password == null){
        alert('Please login first!')
        router.navigate(['/login']);
      }
    }

    ngOnInit(): void {
      
    }
  chooseFromCamera(sourceType){
    const options: CameraOptions = {
       quality: 100,
       mediaType: this.camera.MediaType.PICTURE,
       destinationType: this.camera.DestinationType.FILE_URI,
       encodingType: this.camera.EncodingType.JPEG,
       sourceType: sourceType,
    };

    this.camera.getPicture(options).then((result) => {
      console.log('Camera URL',result);
      this.imageurlresult = result;
      this.imageurl = this.securepath.Ionic.WebView.convertFileSrc(result);
         if(result.hasPermission !== false){
           this.cropimage(result);
         }
    }, error=>{
      console.log('Error CAMERA', error);
    });
  }

  santizeUrl(imageUrl){
    return this.domsanitize.bypassSecurityTrustUrl(imageUrl);
  }

  pickImagesFromLibrary(){
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 1,
    };
    this.imagepicker.getPictures(options).then((imageresult)=> {
    console.log('Image Picker Result: innen::idaig', imageresult);
    if(!imageresult)
    {
      this.imageurlresult = imageresult
      for(let i=0; i<imageresult.length; i++){
       this.imageurl = this.securepath.Ionic.WebView.convertFileSrc(imageresult[i]);
      }
    }
    
    }, rror=>{
      console.log('Image Picker Error:', rror);
    });
  }

 async selectimageOptions(){
    const actionsheet = await this.actionsheet.create({
     header: 'Select image Source',
     buttons: [
       {
         text: 'Load from Gallery',
         handler: ()=>{
           this.pickImagesFromLibrary();
           console.log('Image Selected from Gallery');
         }
       },
       {
         text: 'Select Camera',
         handler: ()=>{
           this.chooseFromCamera(this.camera.PictureSourceType.CAMERA);
           console.log('Camera Selected');
         }
       },
       {
         text: 'Cancel',
         role: 'cancel'
       }
     ]
    });
    await actionsheet.present();
  }

 cropimage(imageurl){
   this.crop.crop(imageurl,   this.imageOptions).then((crop)=>{
    console.log('Cropped Image:', crop);
    console.log('Cropped Image02:', crop.split('?')[0]);
    this.getimagefile(crop);
   },error=>{
     console.log('error croping Image', error);
   });
 }

 getimagefile(imageurl){
  const file = this.file.resolveLocalFilesystemUrl(imageurl).then((entry: FileEntry)=>{
      entry.file((file)=>{
        console.log('return entry File:', file.name);
        this.uploadimageFiletoServer(file);
      }, error=>{
      console.log('error accessing the image entry files', error);
      });
  });
 }

 uploadimageFiletoServer(file){
  const read = new FileReader();
  read.onload = () => {
    const blob = new Blob([read.result], {
      type: file.type
    });
    console.log('fileImage: ', blob.text);

    let formData = new FormData()
    formData.append('image', blob, file.name)

    formData.append('email', this.email)
    formData.append('password', this.password)

    let headers = {
      "Accept": "application/json"
    }

    this.http.setRequestTimeout(200)
    this.http.setDataSerializer('multipart')
    this.http.setHeader('*', 'Content-Type', 'multipart/form-data');
  this.http.postSync(this.urlWeb, formData, headers, response => {
    console.log('Prediction: ', response.data)

    if(response['success'] == false){
      alert('Please relogin!')
      this.router.navigate(['/login']);
    }
    else{
    let jsonObject: any = JSON.parse(response.data);
    this.result = <Result>jsonObject;

    console.log('RESULT: ', this.result.result)
    console.log('SUCCESS: ', this.result.success)
    console.log('SUCCESS: ', this.result.predictions[0])
  
    // let max: Prediction = this.result.predictions.reduce(function(prev, current){
    //   return (prev.probability > current.probability) ? prev : current
    // })

    // console.log('MAX: ', max)

    // this.result.predictions.push(max);
    this.ngZone.run(() => {
      this.router.navigate(['/chart']);
    })}

   

  }, error => {
    console.log('Error: ', error);
  })
  };
  read.readAsArrayBuffer(file);
}

}
