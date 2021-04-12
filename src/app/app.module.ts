import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-component/app.component';
import { TrustComponent } from './trust/trust.component';
import { QuantificationComponent } from './quantification/quantification.component';
import { ComponentsModule } from '../../components/src/components.module';
import { PensionPlanComponent } from './pension-plan/pension-plan.component';
import { InvestPlanComponent } from './invest-plan/invest-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule, ThemeService } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, TrustComponent, QuantificationComponent, PensionPlanComponent, InvestPlanComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ComponentsModule, ReactiveFormsModule, ChartsModule],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
