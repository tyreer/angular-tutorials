import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './not-found/not-found.component';
import { HeroesTutorialModule } from './heroes-tutorial/heroes-tutorial.module';
import { WildcardRoutingModule } from './wildcard-routing.module';
import { EggheadModule } from './egghead/egghead.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HeroesTutorialModule,
    EggheadModule,
    WildcardRoutingModule
  ],
  declarations: [AppComponent, NotFoundComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
