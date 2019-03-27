import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './heroes-tutorial/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './not-found/not-found.component';
import { WildcardRoutingModule } from './wildcard-routing.module';
import { EggheadModule } from './egghead/egghead.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EggheadModule,
    WildcardRoutingModule,
    HttpClientModule,
    // Remove when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [AppComponent, NotFoundComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
