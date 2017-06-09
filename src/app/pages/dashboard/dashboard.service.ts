import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {

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

  createAuthorizationHeader(headers: Headers, userID: string) {
    // Authorization: Base64(userID:userID) // 白癡檢查，要一樣
    headers.append('Authorization', btoa(`${userID}:${userID}`));
  }

  // get the balances include patient, doctor, pharmacist, NHI, insurance
  getBalances(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = '';
    this.createAuthorizationHeader(headers, userID);
    // 可能不用 JSON.stringify(object)
    let body = {};
    return this.http.post(url, body, { headers })
      .map(res => res.json());
    // [
    // {
    //   "UserID": "A",
    // "Balance": 123
    // },
    //   ...
    // ]
  }

  // 處方箋 Prescription (單個就JsonObject, 多個就JsonArray)
  getPrescriptions(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = '';
    this.createAuthorizationHeader(headers, userID);
    // 可能不用 JSON.stringify(object)
    let body = {};
    return this.http.post(url, body, { headers })
      .map(res => res.json());
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

  // Recycle 藥物回收
  getRecycles(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = '';
    this.createAuthorizationHeader(headers, userID);
    // 可能不用 JSON.stringify(object)
    let body = {};
    return this.http.post(url, body, { headers })
      .map(res => res.json());
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
  getTxs(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let userID = '';
    let url = '';
    this.createAuthorizationHeader(headers, userID);
    // 可能不用 JSON.stringify(object)
    let body = {};
    return this.http.post(url, body, { headers })
      .map(res => res.json());
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

}
