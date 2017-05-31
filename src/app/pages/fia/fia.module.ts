import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FiaComponent } from './fia.component';
import { routing } from './fia.routing';

import { HealthInsurance } from './components/health-insurance';
import { Hospital } from './components/hospital';
import { Medication } from './components/medication';
import { Pharmacy } from './components/pharmacy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    FiaComponent,
    // pages
    HealthInsurance,
    Hospital,
    Medication,
    Pharmacy
  ]
})
export class FiaModule {}
