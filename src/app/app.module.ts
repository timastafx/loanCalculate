import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-component/app.component';
import { TrustComponent } from './trust/trust.component';
import { QuantificationComponent } from './quantification/quantification.component';
import { SpoilerComponent } from './Controls/spoiler/spoiler.component';
import { ComponentsModule } from '../../components/src/components.module';

@NgModule({
  declarations: [AppComponent, TrustComponent, QuantificationComponent, SpoilerComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
