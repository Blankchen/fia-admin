import { Component, Input, OnChanges } from '@angular/core';

import { PieChartService } from './pieChart.service';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart implements OnChanges {
  oldScore: number;
  @Input() Score: number=100;

  public charts: Array<Object>;
  private _init = false;

  constructor(private _pieChartService: PieChartService) {
    this.charts = this._pieChartService.getData();
  }

  ngOnChanges() {
    this.charts = this._pieChartService.getData();
    this.oldScore = this.Score;
    this._loadPieCharts();
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      // this._updatePieCharts();
      this._init = true;
    }
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: (from, to, percent) => {
          // jQuery(this.el).find('.chart').data('percent', 100);
            // attr('data-percent', 100);
          //  jQuery(this.el).find('.percent').text(100));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function (index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
