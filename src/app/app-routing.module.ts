import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomRoutePreloader } from './custom-route-preloader';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'egghead/from-home-redirect', pathMatch: 'full' },
  {
    path: 'heroes-tutorial',
    loadChildren:
      './heroes-tutorial/heroes-tutorial.module#HeroesTutorialModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomRoutePreloader
    })
  ],
  providers: [CustomRoutePreloader, AuthGuard]
})
export class AppRoutingModule {}
