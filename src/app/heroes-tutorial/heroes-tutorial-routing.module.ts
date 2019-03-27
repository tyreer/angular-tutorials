import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { HeroesTutorialComponent } from './heroes-tutorial.component';
import { CanDeactivateDirtyComponent } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: HeroesTutorialComponent,
    children: [
      { path: 'heroes', component: HeroesComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'detail/:id',
        component: HeroDetailComponent,
        canDeactivate: [CanDeactivateDirtyComponent]
      },
      { path: 'input', component: NameEditorComponent },
      { path: 'form', component: ProfileEditorComponent }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HeroesTutorialRoutingModule {}
