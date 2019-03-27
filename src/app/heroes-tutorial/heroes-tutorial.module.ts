import { HeroesTutorialRoutingModule } from './heroes-tutorial-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesTutorialComponent } from './heroes-tutorial.component';
import { CanDeactivateDirtyComponent } from './can-deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroesTutorialRoutingModule
  ],
  declarations: [
    HeroesTutorialComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    NameEditorComponent,
    ProfileEditorComponent
  ],
  providers: [CanDeactivateDirtyComponent]
})
export class HeroesTutorialModule {}
