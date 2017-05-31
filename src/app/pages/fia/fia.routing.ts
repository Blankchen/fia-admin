import { Routes, RouterModule } from '@angular/router';

import { FiaComponent } from './fia.component';

import { HealthInsurance } from './components/health-insurance';
import { Hospital } from './components/hospital';
import { Medication } from './components/medication';
import { Pharmacy } from './components/pharmacy';

const routes: Routes = [
  {
    path: '',
    component: FiaComponent,
    children: [
      { path: 'medication', component: Medication },
      { path: 'pharmacy', component: Pharmacy },
      { path: 'hospital', component: Hospital },
      // National Health Insurance Administraion
      { path: 'health-insurance', component: HealthInsurance },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
