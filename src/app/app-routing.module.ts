import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EggheadComponent } from './egghead/egghead.component';

const routes: Routes = [
  { path: '', redirectTo: 'heroes-tutorial/dashboard', pathMatch: 'full' },
  { path: 'egghead', component: EggheadComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
