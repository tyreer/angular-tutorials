# Robert Readme

**Questions**

- Can you just put a component's selector tag into any template and it will insert an instance of the component? Like `<app-hero-list></app-hero-list>`

- What is `<HeroDetailComponent>` in:

```ts
export class CanDeactivateDirtyComponent implements CanDeactivate<HeroDetailComponent>
```

? A return type?

## Notes

```ts
<router-outlet></router-outlet>
<app-e-dynamic-form
[formDataObj]="person" ></app-e-dynamic-form
> </router-outlet>
</div>
```

- In this case we're binding an `AppComponent` **class member**, `person`, to the properties of the `EDynamicFormComponent`

### Template Syntax

https://angular.io/guide/template-syntax#template-syntax

> In Angular, the component plays the part of the controller/viewmodel, and the template represents the view.

#### Input and Output properties

https://angular.io/guide/template-syntax#input-and-output-properties

> An Input property is a settable **property** annotated with an @Input decorator. Values flow into the property when it is data bound with a **property binding**

> Outside components should only be able to bind to the component's **public binding API**. Angular asks you to be explicit about that API. It's up to you to decide which properties are available for binding by external components.

**src/app/app.component.html**

```html
<img [src]="iconUrl" /> <button (click)="onSave()">Save</button>
```

- The `iconUrl` and `onSave` are **members** of the AppComponent class.
  - They are also **public properties** that are bound, in the template, to their own component class

#### Binding to a different component

https://angular.io/guide/template-syntax#binding-to-a-different-component

> The Angular compiler won't bind to properties of a different component unless they are Input or Output properties.

#### Components

**Structural directives**

> Structural directives alter layout by adding, removing, and replacing elements in the DOM

`*ngFor` + `*ngif`

```html
<li *ngFor="let hero of heroes"></li>
<app-hero-detail *ngIf="selectedHero"></app-hero-detail>
```

**Attribute directives**

> Attribute directives alter the appearance or behavior of an existing element.

> The ngModel directive implements two-way data binding

```html
<input [(ngModel)]="hero.name" placeholder="name" />
```

#### Services and DI

```ts
constructor(private service: HeroService) { }
```

> When Angular creates a new instance of a component class, it determines which services or other dependencies that component needs by looking at the constructor parameter types.

> You must **register** at least one provider of any service you are going to use.

```ts
@Injectable({
 providedIn: 'root',
})
```

- Registering the provider in the @Injectable() metadata

> When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects it into any class that asks for it.

```ts
@NgModule({
  providers: [
  BackendService,
  Logger
 ],
 ...
})
```

> When you register a provider with a specific NgModule, the same instance of a service is available to all components in that NgModule.

```ts
@Component({
  selector:    'app-hero-list',
  templateUrl: './hero-list.component.html',
  providers:  [ HeroService ]
})
```

- When you register a provider at the component level, you get a new instance of the service with each new instance of that component.

#### Observables

https://github.com/tc39/proposal-observable

> An observable produces values over time

Observables emit values
Subscriptions handle emitted value via `next()`

> Any type of value (message strings, event objects, numeric values, structures) can be represented with an observable, and the values are published as a stream.

```ts
// Create simple observable that emits three values
const myObservable = of(1, 2, 3);

// Create observer object
const myObserver = {
  next: x => console.log("Observer got a next value: " + x),
  error: err => console.error("Observer got an error: " + err),
  complete: () => console.log("Observer got a complete notification")
};

// Execute with the observer object
myObservable.subscribe(myObserver);
// Logs:
// Observer got a next value: 1
// Observer got a next value: 2
// Observer got a next value: 3
// Observer got a complete notification
```

```ts
myObservable.subscribe(
  x => console.log("Observer got a next value: " + x),
  err => console.error("Observer got an error: " + err),
  () => console.log("Observer got a complete notification")
);
```

- Two above are the same

```ts
function fromEvent(target, eventName) {
  return new Observable(observer => {
    const handler = e => observer.next(e);

    // Add the event handler to the target
    target.addEventListener(eventName, handler);

    return () => {
      // Detach the event handler from the target
      target.removeEventListener(eventName, handler);
    };
  });
}
```

- The **subscriber function** is defined inline (`observer` param)

```ts
const ESC_KEY = 27;
const nameInput = document.getElementById("name") as HTMLInputElement;

const subscription = fromEvent(nameInput, "keydown").subscribe(
  (e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEY) {
      nameInput.value = "";
    }
  }
);
```

- The `next` handler is defined inline

**Multicasting**

> A typical observable creates a new, independent execution for each subscribed observer.

Multicasting means that each subscriber will receive the same value

### Egghead: Create Dynamic Forms in Angular

https://egghead.io/courses/create-dynamic-forms-in-angular

[Sandbox](https://codesandbox.io/s/github/eggheadio-projects/create-dynamic-forms-in-angular/tree/06-angular-add-validation-to-dynamic-forms-in-angular/?from-embed) with final form

[Sandbox](https://codesandbox.io/s/github/eggheadio-projects/create-dynamic-forms-in-angular/tree/07-angular-create-a-dynamic-angular-form-with-ngx-formly/?from-embed) with **ngx-formly**

- https://github.com/ngx-formly/ngx-formly

```html
<div
  *ngIf="
    form.get(prop.key).invalid &&
    (form.get(prop.key).dirty || form.get(prop.key).touched)
  "
></div>
```

- Using **get** here to access the `form` control's children controls (which are inputs)

### Egghead: Learn Angular Router for Real-World Applications

https://egghead.io/courses/learn-angular-router-for-real-world-applications

- Common for different sections of a site to be registered in common `modules`
- We've done with with the `routing module`

```ts
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
```

```ts
export class DynamicFormComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute) {}
  urlParam;

  ngOnInit() {
    // this.urlParam = this.activeRoute.snapshot.params.urlParam;
    this.activeRoute.params.subscribe(data => {
      this.urlParam = data.urlParam;
    });
```

- Either using a **snapshot** or **subscribing** to the active route observable allow us to access a **query parameters**

```ts
const id = +this.route.snapshot.paramMap.get("id");
```

- Heroes tutorial used **paramMap**
  > Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.

_Forward URL parameters to an Angular Service to retrieve the desired data_
https://egghead.io/lessons/angular-forward-url-parameters-to-an-angular-service-to-retrieve-the-desired-data

```ts
import { switchMap } from 'rxjs/operators';
...
this.activatedRoute.params
  .pipe(
    switchMap(params =>
      this.peopleService.getPersonById(+params['personId'])
    )
  )
  .subscribe(person => {
    this.person = person;
  });
```

- Method for handling multiple observables using **rxjs switchMap**

**routerLink examples**

```ts
<nav>
  <a [routerLink]="['/home']">Home</a>
  <a [routerLink]="['/contacts', 'list']">Contacts</a>
  <a [routerLink]="['/people', 'list']">People</a>
  <a [routerLink]="['/about']">About</a>
</nav>
```

```ts
<li *ngFor="let person of people | async">
  <a [routerLink]="['/people', person.id]">{{ person.name }}</a>
</li>
```

- These examples from the Egghead course use routerLink differently than in the Heroes tutorial
  https://angular.io/api/router/RouterLink

```ts
<a routerLink="/heroes-tutorial/detail/{{ hero.id }}">
```

- In Heroes tutorial the link is just like an href

**routerLinkActive**

```ts
<a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
<a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a
```

> lets you add a CSS class to an element when the link's route becomes active

**Angular Resolve**

https://egghead.io/lessons/angular-resolve-data-as-part-of-the-route-transition-in-angular
https://github.com/juristr/egghead-learn-angular-router/tree/10-route-resolvers/src/app/people

```ts
@Injectable()
export class PersonDataResolver implements Resolve<any> {
  constructor(private peopleService: PeopleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this. .getPersonById(+route.params["personId"]);
  }
}
```

- `PersonDataResolver` service declared

```ts
import { PersonDataResolver } from './person-resolver.service';
...
const routes = [
  {
    path: "people/:personId",
    component: PersonDetailComponent,
    resolve: {
      person: PersonDataResolver
    }
  }
];
```

- `resolve` attribute added to route

```ts
export class PersonDetailComponent implements OnInit {
  person;

  constructor(
    private activeRoute: ActivatedRoute,
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.person = data['person'];
```

- Desired value is then accessible via `activeRoute`

**Passing data into routes**

_In routing module_

```ts
const routes: Routes = [
  {
    path: "egghead/:urlParam",
    component: DynamicFormComponent,
    data: {
      person
    }
  }
];
```

_In component_

```ts
ngOnInit() {
  this.activeRoute.data.subscribe(data => {
    this.formDataObj = data.person;
  });
```

**Programmatically navigating**

```ts
onSave(name) {
  // redirect to page with updated query param—either option works
  // this.router.navigateByUrl(`/egghead/${name}`);
  this.router.navigate([`../${name}`], { relativeTo: this.activeRoute });
}
```

**Preserve the current route’s query parameters when navigating**

VIA ROUTERLINK:

_In component_

```ts
export class AppComponent {
  constructor(public activatedRoute: ActivatedRoute) {}
```

_In template_

```ts
<a
  routerLink="/heroes-tutorial"
  routerLinkActive="active-link"
  [queryParams]="activatedRoute.queryParams | async"
  >Heroes Tutorial</a
>
```

- `[queryParams]="activatedRoute.queryParams | async"` persists the query params exposed via the component

VIA PROGRAMMATIC NAVIGATION:

```ts
onSave(name) {
    // redirect to page with updated query param—either option works
    // this.router.navigateByUrl(`/egghead/${name}`);
    this.router.navigate([`../${name}`], {
      relativeTo: this.activeRoute,
      preserveQueryParams: true
    });
  }
```

- Getting `preserveQueryParams is deprecated, use queryParamsHandling instead` in console

**Child navigation**

```ts
const routes: Routes = [
  {
    path: "heroes-tutorial",
    component: HeroesTutorialComponent,
    children: [
      { path: "heroes", component: HeroesComponent },
      { path: "dashboard", component: DashboardComponent }
    ]
  }
];
```

- Just add a `children` property

```html
<nav>
  <a routerLink="/heroes-tutorial/heroes">Heroes</a>
  <a routerLink="/heroes-tutorial/dashboard">Dashboard</a>
</nav>
<router-outlet></router-outlet>
```

- ...and provide a `router-outlet` in the parent template

**Relative locations**

```html
<nav>
  <a [routerLink]="['dashboard']" routerLinkActive="active-link">Dashboard</a>
  <a [routerLink]="['heroes']" routerLinkActive="active-link">Heroes</a>
</nav>
```

- Router knows these are children paths and allows the url to match base segments

```html
<a [routerLink]="['../', form.value.firstname]"
```

- Had done a similar thing in the dynamic-form self link

**Lazy Loading Routes**

Instructor changes: https://github.com/juristr/egghead-learn-angular-router/commit/492e199fa413d2279113d36df5b36ae2c479994d

_Root App router_

```ts
const routes: Routes = [
  { path: "", redirectTo: "egghead/from-home-redirect", pathMatch: "full" },
  {
    path: "heroes-tutorial",
    loadChildren:
      "./heroes-tutorial/heroes-tutorial.module#HeroesTutorialModule"
  }
];
```

- `loadChildren` signals a module should be **lazy loaded** once the route is navigated to
- Need to then _remove_ the module from the base app's NgModule `imports` array
  - Otherwise it would be included as part of the initial bundle, which is what we're trying to avoid

_heroes-tutorial-routing-module.ts_

```ts
const routes: Routes = [
  {
    path: '',
    component: HeroesTutorialComponent,
    children: [
      { path: 'heroes', component: HeroesComponent },
```

- Need to remove the base path for the lazy loaded component, since that path is now being recognized in the base router with the `loadChildren` attribute

**Avoid delays for lazy modules by applying a preloading strategy**

```ts
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

- `preloadingStrategy: PreloadAllModules` on root router module, second parameter allows us to set up preloading strategy for lazy loaded components

**Define a custom preloading strategy**

Mostly these changes, but with a fix commit: https://github.com/juristr/egghead-learn-angular-router/commit/2c0245c45c4c53ca1b1effaf168b058bc2818f6c

- `PreloadAllModules` works great, but if you've got a large app or one with some heavy (or rarely visited) modules, then you'd want a more granular strategy

```ts
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

export class CustomRoutePreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data.preload) {
      return load();
    } else {
      return of(null);
    }
  }
}
```

- Custom loading strategy

```ts
const routes: Routes = [
  { path: "", redirectTo: "egghead/from-home-redirect", pathMatch: "full" },
  {
    path: "heroes-tutorial",
    loadChildren:
      "./heroes-tutorial/heroes-tutorial.module#HeroesTutorialModule",
    data: {
      preload: true
    }
  }
];
```

- Data flag on route that should be preloaded

**Prevent route activation based on user permissions (protected routes)**
https://github.com/juristr/egghead-learn-angular-router/commit/d66ec30d361874c1813e97106db4a0feb6291b3c

```ts
import { AuthGuard } from './auth.guard';
...
const routes: Routes = [
  { path: "", redirectTo: "egghead/from-home-redirect", pathMatch: "full" },
  {
    path: "heroes-tutorial",
    canActivate: [AuthGuard]
  }
];
```

- `canActivate` is the key attribute that determines if a route can be **activated**
  - `AuthGuard` is a mock way to return a boolean

```ts
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl("/");
      return false;
    }
  }
}
```

- `AuthGuard` itself is a nice little model of an injectable dependency
- `canActivate` is the key function where redirect takes place

```ts
export class AppComponent {
  constructor(public authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
```

- `AppComponent` has `AuthGuard` injected in constructor

```html
<div style="text-align: right">
  <a
    href="javascript:;"
    *ngIf="authService.isLoggedIn(); else loginTmpl"
    (click)="logout()"
    >Logout</a
  >

  <ng-template #loginTmpl>
    <a href="javascript:;" (click)="login()">Login</a>
  </ng-template>
</div>
```

- Template both uses the public class member to access isLoggedIn and its own click handlers
- `ng-template` used in **conditional render**

```ts
@NgModule({
  ...
  providers: [CustomRoutePreloader, AuthGuard]
})
```

- Need to include in app routing module providers

**Prevent a route from being lazy loaded based on user permissions**

```ts
  canActivate: [AuthGuard],
  canLoad: [AuthGuard]
```

- `canLoad` can use same boolean as the route protector `canActivate`

```ts
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canEnterRouter();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.canEnterRouter();
  }

  private canEnterRouter() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl("/");
      return false;
    }
  }
}
```

- Need to make `AuthGuard` implement `CanLoad` and then provide logic in `canLoad()` method

**Notify user about unsaved data when leaving a component**
Instructor changes: https://github.com/juristr/egghead-learn-angular-router/commit/356351725a364f62bc9f1e6362e238a91f4f5e41

_My commit implementing feature:_ https://github.com/tyreer/angular-tutorials/commit/271528929531b7c56fae2345d1c9a418ac24f821

```ts
const routes: Routes = [
  {
    path: "",
    component: HeroesTutorialComponent,
    children: [
      {
        path: "detail/:id",
        component: HeroDetailComponent,
        canDeactivate: [CanDeactivateDirtyComponent]
      }
    ]
  }
];
```

- `canDeactivate` is router attribute

```ts
import { CanDeactivate } from "@angular/router";

@Injectable()
export class CanDeactivateDirtyComponent
  implements CanDeactivate<HeroDetailComponent> {
  canDeactivate(component: HeroDetailComponent): boolean {
    const isDirty = component.isDirty;

    if (isDirty) {
      return confirm("You have unsaved changes, do you want to proceed?");
    } else {
      return true;
    }
  }
}
```

- Injectable service **implementing** `CanDeactivate` with **our target component as a parameter**
  - We have access to `component.isDirty` because we've passed in `HeroDetailComponent`
- "This is a normal Angular service"

```ts
  ngOnInit(): void {
    this.getHero();

    this.form.get('name').valueChanges.subscribe(nameValue => {
      if (nameValue !== this.hero.name) {
        this.isDirty = true;
      } else {
        this.isDirty = false;
      }
      this.editedName = nameValue;
    });
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
      this.editedName = hero.name;
    });
  }

  onSubmit({ value, valid }): void {
    if (valid) {
      this.heroService
        .updateHero({ ...this.hero, name: this.editedName })
        .subscribe(() => this.getHero());
      this.isDirty = false;
    }
  }
```

- `valueChanges` is our observable that keeps track on the stream of input changes

```ts
providers: [CanDeactivateDirtyComponent];
```

- Need to include this in `HeroesTutorialModule`

.
.
.
.
.
.
.
.
.
.
.
.

# AngularTourOfHeroes Readme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

```

```
