import {Component} from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  /**
   * 50 icons overview in assets/img/SVG-README.svg
   * http://www.streamlineicons.com/
   */
  streamlineIcon: any = [
    {
      name: '交易',
      path: 'assets/img/SVG/03.svg'
    },
    {
      name: '藥劑師',
      path: 'assets/img/SVG/06.svg'
    },
    {
      name: '清單',
      path: 'assets/img/SVG/12.svg'
    },
    {
      name: '下載',
      path: 'assets/img/SVG/14.svg'
    },
    {
      name: '處方簽',
      path: 'assets/img/SVG/22.svg'
    },
    {
      name: '病人',
      path: 'assets/img/SVG/39.svg'
    },
    {
      name: '病人',
      path: 'assets/img/SVG/40.svg'
    },
    {
      name: '外科醫生',
      path: 'assets/img/SVG/45.svg'
    },
    {
      name: '醫師',
      path: 'assets/img/SVG/49.svg'
    }
  ];

  constructor() {
  }

}
