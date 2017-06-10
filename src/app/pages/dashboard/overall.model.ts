// Balance
export interface Balance {
  UserID: string;
  Balance: number;
}

// 處方箋 Prescription
export interface Prescription {
  DoctorID: string;
  PatientID: string;
  Type: string;
  RemainTimes: number;
  NextDates: string[];
  PrescriptionID: string;
  PrescriptionPrice: PrescriptionPrice;
  MedicineList: MedicineList[];
  DueDate: string;
  CreateTime: Date;
  UpdateTime: Date;
}

export interface PrescriptionPrice {
  HealthInsurancePrice: number;
  OwnExpensePrice: number;
}

export interface MedicineList {
  Name: string;
  Amount: string;
  Memo: string;
}

// Recycle 藥物回收
export interface Recycle {
  PharmacistID: string;
  PatientID: string;
  Medicines: Medicine[];
  CreateTime: Date;
}

export interface Medicine {
  Name: string;
  Amount: string;
  Memo: string;
}

// Tx 給健保局 (給藥的時候產生) (單個就JsonObject, 多個就JsonArray)
export interface Tx {
  PrescriptionID: string;
  PatientID: string;
  PharmacistID: string;
  HealthInsurancePrice: string;
  OwnExpensePrice: string;
  InsuranceID: string;
  CreateTime: Date;
}
