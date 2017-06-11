import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';

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
export class Dashboard implements OnInit {
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
      contents: ['＃藥物交互作用/重複 通知', '醫生開立處方箋(1/3) 評等機制', '患者醫療保險(扣款、投保、保期)', '保險挹注 / 健保啟動']
    },
    {
      title: 'Step 2',
      subTitle: '患者找藥師',
      contents: ['＃區塊鏈主動推播處方箋訊息', '處方箋(2/3)領取藥物', '自動區塊鏈稽核/錢包變動']
    },
    {
      title: 'Step 3',
      subTitle: '健保局獎勵 回收藥物',
      contents: ['更新/取得 藥物回收清單', '＃處方箋/回收藥物 帳本資料']
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
      name: '患者',
      balance: 0,
      isInsure: '#00abff',
      define: '醫療服務的接受者',
      path: 'assets/img/SVG/39.svg'
    },
    {
      name: '藥師',
      balance: 0,
      isInsure: '#00abff',
      define: '提供藥物知識及服務的專業人員',
      path: 'assets/img/SVG/06.svg'
    },
    {
      name: '健保局',
      balance: 0,
      isInsure: '#00abff',
      define: '衛生福利部中央健康保險署',
      path: 'assets/img/national-health-insurance.png'
    },
    {
      name: '保險公司',
      balance: 0,
      isInsure: '#00abff',
      define: '經營保險業務',
      path: 'assets/img/SVG/12.svg'
    }
  ];
  @ViewChild('carousel') _carousel: ElementRef;
  // Typeahead
  states = ['MAFARIN TABLETS', 'AMIORONE TAB', 'ANPO TABLETS', 'ACTRAPID',
    'M.V.C. 9+3', 'MABTHERA SOLUTION FOR IV INFUSION', '"MABTHERA SOLUTION FOR IV INFUSION',
    'MACRABONE INJECTION', 'NOREPINE INJECTION', '"MIXTARD 30', '"MITOMYCIN-C KYOWA'];
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
  prescription: any;
  prescriptionNumber: number = 1;
  prescriptionMemo: string = '';
  prescriptionList: any = [];
  prescriptionResult: any;
  // get arrary list
  selectPrescription: number = 0;
  prescriptionArray: any = [];
  // 醫師評等分數
  docScore: number;
  // isInteration: boolean;
  // 通知 訊息 list
  notifications: Array<Object>;
  messages: Array<Object>;
  // 通知 訊息 model one data
  notificationData: any;
  messagesData: any;
  // line chart
  lineChartData: any;
  // recyclesTable
  recyclesTable: any;
  // 顯示錢包
  isShowWallet: boolean;

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
    // this._dashboardService.getTxs()
    // this._dashboardService.getRecycles()
    // this._dashboardService.createInsure()
    // this._dashboardService.checkPrescriptions()
    // this._dashboardService.createPrescriptions()
    // .subscribe(
    // (res) => console.log(res)
    // );
    this.getBalances();
    // test
    this.getPrescriptions();
    this.getGetDReb();
    // 結果
    this.getTxs();
    // recyclesTable
    this.getRecycles();
  }

  getBalances() {
    this._dashboardService.getBalances().subscribe(
      (data: any) => {
        console.log('getBalances', data[0]['UserID']);
        // UserID: "nhi", "insc", "pharm_0", "pharm_1", "pat_0"
        for (let balance of data) {
          if (balance['UserID'] === 'pat_0') {
            this.roles[0].balance = balance['Balance'];
          } else if (balance['UserID'] === 'pharm_0') {
            this.roles[1].balance = balance['Balance'];
          } else if (balance['UserID'] === 'nhi') {
            this.roles[2].balance = balance['Balance'];
          } else if (balance['UserID'] === 'insc') {
            this.roles[3].balance = balance['Balance'];
          }
        }
        console.log('getBalances', data, this.roles);
      }
    );
  }

  addPrescriptions() {
    // console.log(this.prescription, this.prescriptionList);
    // 'MAFARIN TABLETS', 'AMIORONE TAB'
    // if ((this.prescription === 'MAFARIN TABLETS' && this.prescriptionList.indexOf('AMIORONE TAB') > -1)
    //   || (this.prescription === 'AMIORONE TAB' && this.prescriptionList.indexOf('MAFARIN TABLETS') > -1)) {
    //   this.isInteration = true;
    // } else {
    //   this.isInteration = false;

    this.prescriptionList.push({
      "Name": this.prescription,
      "Amount": this.prescriptionNumber.toString(),
      "Memo": this.prescriptionMemo !== '' ? this.prescriptionMemo.toString() : ""
    });
    // }
  }

  checkPrescriptions() {
    console.log('checkPrescriptions', this.prescriptionList);
    this._dashboardService.checkPrescriptions(this.prescriptionList)
      .subscribe(
      (data) => this.prescriptionResult = data
      );
  }

  createPrescriptions() {
    console.log('createPrescriptions', this.prescriptionList);
    this._dashboardService.createPrescriptions(this.prescriptionList)
      .subscribe(
      (data) => {
        console.log('createPrescriptions', data);
        this.getPrescriptions();
        // 醫師評等
        setTimeout(() => {
          this.getGetDReb();

          setTimeout(() => {
            this.getPrescriptions();
          }, 1000);
        }, 2000);

      }
      );
  }

  getGetDReb() {
    this._dashboardService.getGetDReb()
      .subscribe(
      (score: any) => {
        console.log('createPrescriptions', score);
        this.docScore = score;
      });
  }

  createInsure() {
    this._dashboardService.createInsure()
      .subscribe(
      (res) => {
        console.log('createInsure');
        // hardcode
        this.roles[0].isInsure = '#ed4766';
      }
      );
  }

  getPrescriptions() {
    this._dashboardService.getPrescriptions()
      .subscribe(
      (data: any) => {
        console.log('getPrescriptions', data);
        // hardcode
        this.prescriptionArray = data;
      }
      );
  }

  // 跟藥師領藥
  updatePrescriptions(prescription) {
    this._dashboardService.updatePrescriptions(prescription)
      .subscribe(
      (data: any) => {
        console.log('updatePrescriptions', data);

        setTimeout(() => {
          this.getBalances();
        }, 2000);

        setTimeout(() => {
          this.getTxs();
        }, 3000);
      }
      );
  }

  createRecycles() {
    this._dashboardService.createRecycles(this.prescriptionList)
      .subscribe(
      (data: any) => {
        console.log('createRecycles', data);

        setTimeout(() => {
          this.getRecycles();
        }, 2000);
      }
      );
  }

  getRecycles() {
    this._dashboardService.getRecycles()
      .subscribe(
      (data: any) => {
        console.log('getRecycles', data);
        this.recyclesTable = data;
      }
      );
  }

  getTxs() {
    this._dashboardService.getTxs()
      .subscribe(
      (data: any) => {
        console.log('getTxs', data);
        // HealthInsurancePrice
        this.setLineChart(data);
      }
      );
  }

  setLineChart(data: any) {
    let total = 2000000000;
    let tempData = [];
    //  { date: new Date(2012, 11), value: 0, value0: 0 },
    var i = 0
    for (let item of data) {
      total -= +item.HealthInsurancePrice;
      let t = new Date(item.CreateTime);
      i++
      tempData.push({
        // new Date(item.CreateTime)
        date: new Date(t.getFullYear(), t.getMonth(), t.getDate() + i * 2 - 10),
        value: total,
      });
    }
    // tempData.push({ date: new Date(2017, 6, 11, 12), value: total});
    // tempData.push({ date: new Date(2017, 6, 12, 12), value: total-5000});
    //   tempData.push({ date: new Date(2017, 6, 13, 12), value: total-10000});
    this.lineChartData = tempData;
    console.log('----', this.lineChartData);
  }


  @HostListener('window:scroll')
  _onWindowScroll(): void {
    // 1400
    if (window.scrollY > 1000) {
      this.setNotifications('提醒您！您的處方箋領藥時間要到了，請儘速至藥局領取！關心你的健康！');
    }
    // 顯示下方錢包
    if (window.scrollY > 690) {
      this.isShowWallet = true;
    } else {
      this.isShowWallet = false;
    }
    console.log('----', window.scrollY);
  }

  // set notifications role
  setNotifications(not: string) {
    let msg = {
      // msg.image ||  (msg.name)
      // text: this.notificationData,
      text: not,
      time: new Date().toString()
    };
    if (!this.notifications) {
      this.notifications = [];
      this.notifications.push(msg);
    }
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
