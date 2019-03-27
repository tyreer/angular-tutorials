import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './e-dynamic-form/e-dynamic-form.component';

const person = {
  firstname: {
    label: 'Firstname',
    value: 'Juri',
    type: 'text',
    validators: {
      required: true
    }
  },
  age: {
    label: 'Age',
    value: 32,
    type: 'number',
    validators: {
      min: 18
    }
  },
  gender: {
    label: 'Gender',
    value: 'F',
    type: 'radio',
    options: [{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]
  },
  city: {
    label: 'City',
    value: 'NY',
    type: 'select',
    options: [
      { label: '(choose one)', value: '' },
      { label: 'New York', value: 'NY' },
      { label: 'Los Angeles', value: 'LA' },
      { label: 'Salt Lake City', value: 'SLC' }
    ]
  }
};

const routes: Routes = [
  { path: 'egghead', redirectTo: '/egghead/123', pathMatch: 'full' },
  {
    path: 'egghead/:urlParam',
    component: DynamicFormComponent,
    data: {
      person
    }
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class EggheadRoutingModule {}
