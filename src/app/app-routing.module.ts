import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ExampleComponent } from './example.component';
import { LogoutComponent } from './auth/logout/logout.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ExampleComponent,
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          },
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
          },
          {
            path: 'login',
            loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
          },
          {
            path: 'register',
            loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
          },
          {
            path: 'chart',
            loadChildren: () => import('./chart/chart.module').then( m => m.ChartComponentModule)
          },
          {
            path: 'logout', component: LogoutComponent
          },
        ],
      },
    ]
    ),
], 
  exports: [RouterModule],
})
export class AppRoutingModule { }
