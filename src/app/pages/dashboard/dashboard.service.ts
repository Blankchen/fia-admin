import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {
  mycc: string = 'mycc';
  //  production
  // mycc: string = '7aeecbf5262d43570e27afc5e5acf3ddffc9c5bdf174d3a31f7d6201593718e9';

  // 6/8
  // 最後實做成這樣
  // "role": "doctor", // doctor, pharmacist, patient
  // POST http://ip/{chaincode_action}
  // Authorization: Base64(userID:userID) // 白癡檢查，要一樣
  // Request Body:
  // {
  //   "act": "invoke", //invoke
  //   "args": ["args1", "args2", ...] //參數一律字串
  // }

  // 回傳就依SDK給什，我吐什，基本上都會200結果會寫在sdkState中
  // Response Body: (200 -OK)
  // {
  //   "sdkState": "1", // "0": fail; "1": "OK"
  //   "sdkResult": "JSON字串照吐給你"
  // }

  constructor(private http: Http) { }

  // createAuthorizationHeader(headers: Headers, userID: string) {
  //   // Authorization: Base64(userID:userID) // 白癡檢查，要一樣
  //   headers.append('Authorization', btoa(`${userID}:${userID}`));
  // }

  // get the balances include patient, doctor, pharmacist, NHI, insurance
  getBalances(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/query';
    // this.createAuthorizationHeader(headers, userID);
    let body = {
      // invokeRequest
      "queryRequest": {
        "chaincodeID": this.mycc,
        "fcn": "ListBalance",
        "args": []
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    return this.http.post(url, body, { headers })
      .map(res => JSON.parse(res.json().sdkResult));
    // .map(data => data.sdkResult.json());
    // [
    // {
    //   "UserID": "A",
    // "Balance": 123
    // },
    //   ...
    // ]
  }

  // 檢查處方箋 只有建立處方箋前才要檢查
  checkPrescriptions(MedicineList: any): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/query';
    // console.log('---', MedicineList);
    let prescriptions = {
      "Type": "cont",
      "RemainTimes": 3,
      "PrescriptionPrice": {
        "HealthInsurancePrice": "500",
        "OwnExpensePrice": "100"
      },
      // "MedicineList": MedicineList,
      // "MedicineList": [{
      //   "Name": "SLEEP_NAO",
      //   "Amount": "30",
      //   "Memo": "EAT A LOT"
      // }]
      "DueDate": "2019-01-01"
    };
    prescriptions["MedicineList"] = MedicineList;
    // this.createAuthorizationHeader(headers, userID);
    let body = {
      "queryRequest": {
        "chaincodeID": this.mycc,
        "fcn": "CheckPrescription",
        // "$json/p1" <= 處方箋 JSON to string
        // "pat_0" <= 病人編號
        // "drpat_0" <= 醫生編號
        "args": [JSON.stringify(prescriptions), "pat_0", "drpat_0"]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    // "$json/p1" <= 處方箋 JSON to string
    // "$json/p1" JSON <= HealthInsurancePrice/5 = OwnExpensePrice,
    return this.http.post(url, body, { headers })
      .map(res => JSON.parse(res.json().sdkResult));
    // SLEEP_NAO_rec: "the drug have conflict with other prescprition"
    // 藥物名稱：衝突理由 （只有衝突會顯示）
  }

  // 建立處方箋 前 需要檢查處方箋
  createPrescriptions(MedicineList: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/invoke';
    let prescriptions = {
      "Type": "cont",
      "RemainTimes": 3,
      "PrescriptionPrice": {
        "HealthInsurancePrice": "500",
        "OwnExpensePrice": "100"
      },
      // "MedicineList": [{
      //   "Name": "SLEEP_NAO",
      //   "Amount": "30",
      //   "Memo": "EAT A LOT"
      // }],
      "DueDate": "2019-01-01"
    };
    prescriptions["MedicineList"] = MedicineList;
    let body = {
      "invokeRequest": {
        "chaincodeID": this.mycc,
        "fcn": "CheckPrescription",
        // "$json/p1" <= 處方箋 JSON to string
        // "pat_0" <= 病人編號
        // "drpat_0" <= 醫生編號
        "args": [JSON.stringify(prescriptions), "pat_0", "drpat_0"]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    // "$json/p1" <= 處方箋 JSON to string
    // "$json/p1" JSON <= HealthInsurancePrice/5 = OwnExpensePrice,
    return this.http.post(url, body, { headers });
    // .map(res => JSON.parse(res.json().sdkResult));
  }

  // 評等紀錄
  getGetDReb(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = 'http://192.168.1.157:5000/chaincode/query';
    let body = {
      "queryRequest": {
        "chaincodeID": this.mycc,
        "fcn": "GetDrRep",
        "args": ["drpat_0"]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    // "$json/p1" <= 處方箋 JSON to string
    // "$json/p1" JSON <= HealthInsurancePrice/5 = OwnExpensePrice,
    return this.http.post(url, body, { headers })
      .map(res => JSON.parse(res.json().sdkResult));
  }

  // 處方箋 Prescription (單個就JsonObject, 多個就JsonArray)
  getPrescriptions(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/query';
    // this.createAuthorizationHeader(headers, userID);
    let body = {
      "queryRequest": {
        "chaincodeID": this.mycc,
        "fcn": "ListPrescription",
        // patient index 0, 1/3 Prescription
        // "args": ["pat_0_1"]
        "args": ["pat_0", "", "0", "true", "30", "", "", "false"]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    // List sort 找最後一筆
    return this.http.post(url, body, { headers })
      .map((res) => {
        let list = JSON.parse(res.json().sdkResult);
        return list;
        // list.sort((a, b) => {
        //   if (a.UpdateTime < b.UpdateTime) return -1;
        //   if (a.UpdateTime > b.UpdateTime) return 1;
        //   return 0;
        // });
        // return list[list.length-1];
      });
    // [{
    //   "DoctorID": "dr_1",
    //   "PatientID": "pat_1",
    //   // Type can be "cont" for Continuous Prescription or "norm" for Normal Prescription.
    //   "Type": "cont",
    //   "RemainTimes": 2,
    //   "NextDates": [
    //     "2017-07-01",
    // 	"2017-07-18"
    //   ],
    //   "PrescriptionID": "pres_1",
    //   "PrescriptionPrice": {
    //     "HealthInsurancePrice": 100,
    // 	"OwnExpensePrice": 10
    //   },
    //   "MedicineList": [
    //     {
    //       "Name": "感冒藥",
    // 	  "Amount": "6",
    // 	  "Memo": "三餐飯後"
    // 	},
    // 	...
    //   ],
    //   "DueDate": "2017-08-01",
    //   "CreateTime": "2017-06-15T12:59:59.000+0800",
    //   "UpdateTime": "2017-06-15T12:59:59.000+0800"
    // }, ...]
  }

  updatePrescriptions(prescription: any) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/invoke';
    // this.createAuthorizationHeader(headers, userID);
    let body = {
      "invokeRequest": {
        "chaincodeID": this.mycc,
        "fcn": "ReceiveMedicine",
        "args": [prescription.PatientID , prescription.PrescriptionID , "pharm_0"]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    // List sort 找最後一筆
    return this.http.post(url, body, { headers });
  }

  // Recycle 藥物回收
  createRecycles(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/invoke';
    // this.createAuthorizationHeader(headers, userID);
    let medicineList = {
      "MedicineList": [{
        "Name": "SLEEP_NAO",
        "Amount": "30",
        "Memo": "EAT A LOT"
      }]
    };
    let body = {
      "invokeRequest": {
        "chaincodeID": this.mycc,
        "fcn": "RecycleMedicine",
        "args": ["pharm_0", "pat_0", JSON.stringify(medicineList)]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    return this.http.post(url, body, { headers })
      .map(res => JSON.parse(res.json().sdkResult));
  }

  // Recycle 藥物回收
  getRecycles(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/query';
    // this.createAuthorizationHeader(headers, userID);
    let body = {
      "queryRequest": {
        "chaincodeID": this.mycc,
        "fcn": "ListRecycleInfo",
        "args": ["pat_0"]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    return this.http.post(url, body, { headers })
      .map(res => JSON.parse(res.json().sdkResult));
    // {
    //   "PharmacistID": "pharm_1",
    //   "PatientID": "pat_1",
    //   "Medicines": [
    //     {
    //       "Name": "感冒藥",
    // 	  "Amount": "6",
    // 	  "Memo": "三餐飯後"
    // 	},
    // 	...
    //   ],
    //   "CreateTime": "2017-06-15T12:59:59.000+0800"
    // }
  }

  // Tx (給藥的時候產生) (單個就JsonObject, 多個就JsonArray)
  // 給藥師核銷 健保 保險公司 藥局
  getTxs(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/query';
    // this.createAuthorizationHeader(headers, userID);
    let body = {
      "queryRequest": {
        "chaincodeID": this.mycc,
        "fcn": "ListTx",
        "args": ["pharm_0", "pat_0", "", "", "", ""]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };
    // {
    //   "queryRequest":{
    //   	"chaincodeID":"mycc",
    // 	"fcn":"ListTx",
    // 	"args":[""]
    //   },
    //   "user":{
    // 	 "enrollID":"lukas",
    // 	 "enrollSecret":"123455"
    //   }
    // }
    return this.http.post(url, body, { headers })
      .map(res => JSON.parse(res.json().sdkResult));
    // HealthInsurancePrice <= trend chart

    // [{
    //   "PrescriptionID": "pres_1",
    //   "PatientID": "pat_1",
    //   "PharmacistID": "pharm_1",
    //   "HealthInsurancePrice": "100",
    //   "OwnExpensePrice": "10",
    //   "InsuranceID": "ins_pat_1",
    //   "CreateTime": "2017-06-15T12:59:59.000+0800"
    // },...]
  }

  // 建立保險 沒有get
  createInsure() {
    // 扣患者 10000 之後扣保險的錢 before create Prescription
    // Tx "InsuranceID": "ins_pat_1",
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = 'http://192.168.1.157:5000/chaincode/invoke';
    // this.createAuthorizationHeader(headers, userID);
    let body = {
      "invokeRequest": {
        "chaincodeID": this.mycc,
        "fcn": "CreateInsure",
        "args": ["pat_0"]
      },
      "user": {
        "enrollID": "lukas",
        "enrollSecret": "87654321"
      }
    };

    return this.http.post(url, body, { headers });
      // .map(res => JSON.parse(res.json().sdkResult));

  }




}
