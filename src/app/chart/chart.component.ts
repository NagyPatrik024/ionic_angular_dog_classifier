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
  chartOptions = {
    animationEnabled: true,
    theme: "dark2",
    title:{
    text: "Prediction result"
    },
    data: [{
    type: "doughnut",
    yValueFormatString: "#,###.##'%'",
    indexLabel: "{name}: {y}",
    dataPoints: [
      { y: 28, name: "Labour" }
    ]
    }]
    }	

  constructor(private appService: AppService) {
    this.chart = false;
   }

  ngOnInit() {}
  
  ionViewWillEnter(){
    this.result = this.appService.getMyResult();
    if (this.result != null) {
      this.chart = true;
      this.chartOptions = {
        animationEnabled: true,
        theme: "dark2",
        title:{
        text: "Prediction result"
        },
        data: [{
        type: "doughnut",
        yValueFormatString: "#,###.##'%'",
        indexLabel: "{name}: {y}",
        dataPoints: setDataPoints(this.appService)
        }]
      }	
      
    }
  }
}

function setDataPoints(appService){
  var temp = []
  var result = appService.getMyResult();
  result.predictions.forEach(function (value) {
    console.log(value.label);
    console.log(value.probability);
    // this.chartOptions.data[0].dataPoints.push({y: value.probability, name: value.label});
    temp.push({ y: value.probability, name: value.label });
  }); 
  return temp;
//return {a,b};
}
           
