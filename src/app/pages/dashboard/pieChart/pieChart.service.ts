import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: '用藥評等',
        stats: '$ 57,820',
        icon: 'person',
      },
      //  {
      //   color: pieColor,
      //   description: '保險給付額',
      //   stats: '$ 89,745',
      //   icon: 'money',
      // }, {
      //   color: pieColor,
      //   description: '收取給付額',
      //   stats: '$ 178,391',
      //   icon: 'face',
      // }, {
      //   color: pieColor,
      //   description: '電子錢包',
      //   stats: '$ 32,592',
      //   icon: 'refresh',
      // }
    ];
  }
}
