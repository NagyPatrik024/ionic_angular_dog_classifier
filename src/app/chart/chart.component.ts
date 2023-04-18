import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared.service';
import { Result } from '../home/prediction';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit{
  chart: boolean;
  result: Result;

  constructor(private appService: AppService) {
    this.chart = false;
   }

  ngOnInit() {}
  chartOptions = {
  animationEnabled: true,
  title:{
  text: "Prediction result"
  },
  data: [{
  type: "doughnut",
  yValueFormatString: "#,###.##'%'",
  indexLabel: "{name}: {y}",
  dataPoints: [
    { y: 28, name: "Labour" },
    { y: 10, name: "Legal" },
    { y: 20, name: "Production" },
    { y: 15, name: "License" },
    { y: 23, name: "Facilities" },
    { y: 17, name: "Taxes" },
    { y: 12, name: "Insurance" }
  ]
  }]
	}	
  ionViewWillEnter(){
    this.result = this.appService.getMyResult();
    if (this.result != null) {
      this.chart = true
      this.chartOptions = {
        animationEnabled: true,
        title:{
        text: "Prediction result"
        },
        data: [{
        type: "doughnut",
        yValueFormatString: "#,###.##'%'",
        indexLabel: "{name}: {y}",
        dataPoints: [
          { y: 70, name: "Teszt" },
          { y: 30, name: "Teszt2" },
            ]
          }]
        }	
    }
  }
}            
