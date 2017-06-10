import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';

import { DashboardService } from './dashboard.service';
import { GlobalState } from '../../global.state';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import { Balance } from './overall.model';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit{
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
  progressWidth: number = 33; // total*this = 100%
  progressStep: number = 1;
  progressBar: any = [
    {
      title: 'Step 1:',
      subTitle: '患者看醫生',
      contents: ['藥物交互作用通知', '醫生開立處方箋(1/3)', '患者醫療保險(扣款、投保、保期)', '保險挹注 / 健保啟動']
    },
    {
      title: 'Step 2',
      subTitle: '患者找藥師',
      contents: ['區塊鏈主動推播訊息', '處方箋(2/3)領取藥物', '更新/取得 藥物回收清單']
    },
    {
      title: 'Step 3',
      subTitle: '健保局獎勵回收藥物',
      contents: ['隨機抽獎並給予唯一患者獎勵']
    },
    // {
    //   title: 'Step 4',
    //   subTitle: '患者看醫生',
    //   contents: ['患者拿處方箋找藥師拿藥，資料藉由藥師上傳到健保局(資料更新區塊鏈?)']
    // },
    // {
    //   title: 'Step 5',
    //   subTitle: '患者看醫生',
    //   contents: ['患者藥物回收，健保局抽出回收者並予與獎勵(以區塊鏈發送獎金制患者錢包)']
    // },
  ];
  // ng-carousel
  carouselImages: any = [];
  // current roles (name, define, path)
  // currentRole: any = {
  //   name: '患者',
  //   define: '患者 - 是指醫療服務的接受者，需要醫生和護理人員進行治療的人',
  //   path: 'assets/img/SVG/39.svg'
  // };
  // roles
  roles: any = [
    {
      name: '曹操(患者)',
      define: '醫療服務的接受者，需要醫生和護理人員進行治療的人',
      path: 'assets/img/SVG/39.svg'
    },
    {
      name: '神農氏(藥師)',
      define: '提供藥物知識及藥事服務的專業人員',
      path: 'assets/img/SVG/06.svg'
    },
    {
      name: '華佗(醫生)',
      define: '又稱醫師，在中國古代稱大夫或郎中',
      path: 'assets/img/SVG/49.svg'
    }
  ];
  @ViewChild('carousel') _carousel: ElementRef;
  // Typeahead
  states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
//     [
//   {"Name": "MAFARIN TABLETS 5 MG 脈化寧錠5毫克", "Amount": "5 MG", "Price": 5},
//   {"Name": "AMIORONE TAB. 200MG (AMIODARONE) 艾歐隆錠２００公絲 (艾米達隆)", "Amount": "200 MG", "Price": 14},
//   {"Name": "ANPO TABLETS 10MG 安寶錠１０公絲 (鹽酸立特林)", "Amount": "10 MG", "Price": 13},
//   {"Name": "ACTRAPID 100 I.U./ML 愛速基因人體胰島素", "100 IU", "Amount": "Price": 124},
//   {"Name": "M.V.C. 9+3 蒙多維命９＋３注射液", "Amount": "10 ML", "Price": 98},
//   {"Name": "MABTHERA SOLUTION FOR IV INFUSION 莫須瘤 注射劑", "Amount": "10 ML", "Price": 8800},
//   {"Name": "MACRABONE INJECTION 瑪樂蒙注射液", "Amount": "2 ML", "Price": 20},
//   {"Name": "NOREPINE INJECTION 心復壓注射劑", "Amount": "4 ML", "Price": 118},
//   {"Name": "MIXTARD 30 密斯它３０胰島素注射液", "Amount": "1 KIU", "Price": 300},
//   {"Name": "MITOMYCIN-C KYOWA 10MG 排多癌注射劑１０公絲 '協和'", "Amount": "10 MG", "Price": 555}
// ]
  model: any;
  // 通知 訊息 list
  notifications: Array<Object>;
  messages: Array<Object>;
  // 通知 訊息 model one data
  notificationData: any;
  messagesData: any;

  // Typeahead
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  // constructor(private _baMsgCenterService:BaMsgCenterService) {
  //   this.notifications = this._baMsgCenterService.getNotifications();
  //   this.messages = this._baMsgCenterService.getMessages();
  // }

  constructor(private _dashboardService: DashboardService, private _state: GlobalState) {
    // init ng-bootstrap carouse images
    for (let i = 1; i <= 7; i++) {
      this.carouselImages.push(`assets/img/health${i}.jpg`);
    }
    // get currentRoles
    // this._state.subscribe('menu.currentRole', (currentRole) => {
    //   this.currentRole = currentRole;
    // });
    // notifications
    this._state.subscribe('menu.notifications', (notifications) => {
      this.notifications = notifications;
    });
    // messages
    this._state.subscribe('menu.messages', (messages) => {
      this.messages = messages;
    });
  }

  ngOnInit() {
    // this._dashboardService.getBalances()
    // this._dashboardService.getPrescriptions()
    this._dashboardService.getTxs()
      .subscribe(
        (res) => console.log(res)
      );

  }

  // set notifications role
  setNotifications() {
    let msg = {
      // msg.image ||  (msg.name)
      text: this.notificationData,
      time: '3 hrs ago'
    };
    if (!this.notifications) { this.notifications = []; }
    this.notifications.push(msg);
    this._state.notifyDataChanged('menu.notifications', this.notifications);
  }

  // set messages role
  setMessages() {
    let msg = {
      // msg.image ||  (msg.name)
      text: this.messagesData,
      time: '2 hrs ago'
    };
    if (!this.messages) { this.messages = []; }
    this.messages.push(msg);
    this._state.notifyDataChanged('menu.messages', this.messages);
  }

  // progress bar 1~N
  seProgressForward() {
    this.progressStep += 1;
    if (this.progressStep > this.progressBar.length) {
      this.progressStep = 1;
    }
  }

  // progress bar 1~N
  seProgressBackward() {
    this.progressStep -= 1;
    if (this.progressStep < 1) {
      this.progressStep = this.progressBar.length;
    }
  }


}
