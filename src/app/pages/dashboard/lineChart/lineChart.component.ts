import {Component, Input, OnChanges} from '@angular/core';

import {LineChartService} from './lineChart.service';

@Component({
  selector: 'line-chart',
  templateUrl: './lineChart.html',
  styleUrls: ['./lineChart.scss']
})
export class LineChart implements OnChanges {
  @Input() lineChartData: any;

  chartData:Object;

  constructor(private _lineChartService:LineChartService) {
    this.chartData = this._lineChartService.getData();
  }

  ngOnChanges() {
    console.log('---------', this.lineChartData);
    delete this.chartData;
    this.chartData = this._lineChartService.getData();
    // dataProvider
    this.chartData['dataProvider'] = this.lineChartData;
  }

  initChart(chart:any) {
    let zoomChart = () => {
      chart.zoomToDates(new Date(2017, 5, 1), new Date(2017, 6, 30));
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
