import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

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
  // current roles (name, define, path)
  currentRole: any = {
    name: '患者',
    define: '患者 - 是指醫療服務的接受者，需要醫生和護理人員進行治療的人',
    path: 'assets/img/SVG/39.svg'
  };
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
    this._state.subscribe('menu.currentRole', (currentRole) => {
      this.currentRole = currentRole;
    });
    // notifications
    this._state.subscribe('menu.notifications', (notifications) => {
      this.notifications = notifications;
    });
    // messages
    this._state.subscribe('menu.messages', (messages) => {
      this.messages = messages;
    });
  }

  // set notifications role
  setNotifications() {
    let msg = {
      // msg.image ||  (msg.name)
      text: this.notificationData,
      time: '3 hrs ago'
    };
    console.log('setNotifications', this.notifications, msg);
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
