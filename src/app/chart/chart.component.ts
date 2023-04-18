import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent{

  constructor() { }

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
}            
