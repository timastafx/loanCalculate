import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrustComponent } from './trust/trust.component';
import { QuantificationComponent } from './quantification/quantification.component';
import { PensionPlanComponent } from './pension-plan/pension-plan.component';
import { InvestPlanComponent } from './invest-plan/invest-plan.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'loanCalculate' },
  { path: 'loanCalculate', component: TrustComponent },
  { path: 'quantification', component: QuantificationComponent },
  { path: 'pension', component: PensionPlanComponent },
  { path: 'invest-plan', component: InvestPlanComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
