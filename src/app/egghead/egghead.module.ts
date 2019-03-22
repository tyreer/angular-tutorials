import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './e-dynamic-form/e-dynamic-form.component';
import { EggheadComponent } from './egghead.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [EggheadComponent, DynamicFormComponent]
})
export class EggheadModule {}
