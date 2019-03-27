import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './e-dynamic-form/e-dynamic-form.component';
import { EggheadComponent } from './egghead.component';
import { EggheadRoutingModule } from './egghead-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EggheadRoutingModule
  ],
  declarations: [EggheadComponent, DynamicFormComponent]
})
export class EggheadModule {}
