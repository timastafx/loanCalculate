import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { InputGroupComponent } from './input-group/input-group.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  declarations: [TabsComponent, InputGroupComponent],
  exports: [TabsComponent, InputGroupComponent]
})
export class ComponentsModule {}
