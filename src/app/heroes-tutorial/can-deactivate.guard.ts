import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

@Injectable()
export class CanDeactivateDirtyComponent
  implements CanDeactivate<HeroDetailComponent> {
  canDeactivate(component: HeroDetailComponent): boolean {
    const isDirty = component.isDirty;

    if (isDirty) {
      return confirm('You have unsaved changes, do you want to proceed?');
    } else {
      return true;
    }
  }
}
