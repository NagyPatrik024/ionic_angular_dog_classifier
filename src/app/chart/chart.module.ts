import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartComponentRoutingModule } from './chart-routing.module';
 
import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
 
@NgModule({
  declarations: [
    ChartComponent,
    CanvasJSChart
  ],
  imports: [
     ChartComponentRoutingModule,
     CommonModule
  ],
  providers: [],
  bootstrap: [ChartComponent]
})
export class ChartComponentModule { }  