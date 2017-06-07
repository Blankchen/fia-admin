import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { DashboardService } from './dashboard.service';
import { GlobalState } from '../../global.state';


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
  streamlineIcons: any = [
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
  // progress bar
  progressStep: number = 1;
  progressBar: any = [
    {
      title: 'Step 1',
      content: '患者看醫生'
    },
    {
      title: 'Step 2',
      content: '醫生看病歷資料(?)與過敏資料(3的資料)，開處方箋給患者(資料更新區塊鏈)'
    },
    {
      title: 'Step 3',
      content: '患者拿到處方箋或回饋醫生更新過敏資料(上傳日期、過敏內容(藥物名)、上傳醫生、上傳機構、電話、地址) (資料更新區塊鏈)'
    },
    {
      title: 'Step 4',
      content: '患者拿處方箋找藥師拿藥，資料藉由藥師上傳到健保局(資料更新區塊鏈?)'
    },
    {
      title: 'Step 5',
      content: '患者藥物回收，健保局抽出回收者並予與獎勵(以區塊鏈發送獎金制患者錢包)'
    },
  ];
  // ng-carousel
  carouselImages: any = [];
  // table data
  peopleTableData: Array<any>;
  // current roles (name, define, path)
  currentRole: any = {
    name: '患者',
    define: '患者 - 是指醫療服務的接受者，需要醫生和護理人員進行治療的人',
    path: 'assets/img/SVG/39.svg'
  };
  @ViewChild('carousel') _carousel: ElementRef;


  constructor(private _dashboardService: DashboardService, private _state: GlobalState) {
    // init ng-bootstrap carouse images
    for (let i = 1; i <= 7; i++) {
      this.carouselImages.push(`assets/img/health${i}.jpg`);
    }
    // get table data
    this.peopleTableData = _dashboardService.peopleTableData;
    // get currentRoles
    this._state.subscribe('menu.currentRole', (currentRole) => {
      this.currentRole = currentRole;
    });
  }


}
