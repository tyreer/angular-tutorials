import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { HeroesTutorialComponent } from './heroes-tutorial.component';

const routes: Routes = [
  { path: 'heroes-tutorial', component: HeroesTutorialComponent },
  { path: 'heroes-tutorial/heroes', component: HeroesComponent },
  { path: 'heroes-tutorial/dashboard', component: DashboardComponent },
  { path: 'heroes-tutorial/detail/:id', component: HeroDetailComponent },
  { path: 'heroes-tutorial/input', component: NameEditorComponent },
  { path: 'heroes-tutorial/form', component: ProfileEditorComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HeroesTutorialRoutingModule {}
