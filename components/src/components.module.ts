import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { InputGroupComponent } from './input-group/input-group.component';
import { SpoilerComponent } from './spoiler/spoiler.component';
import { OutputTextComponent } from './output-text/output-text.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  declarations: [TabsComponent, InputGroupComponent, SpoilerComponent, OutputTextComponent],
  exports: [TabsComponent, InputGroupComponent, SpoilerComponent, OutputTextComponent]
})
export class ComponentsModule {}
