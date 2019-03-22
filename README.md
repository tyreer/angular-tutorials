# Robert Readme

**Questions**

- How would I include a separate nav for all the heros pages?

  - Can I have a `router-outlet` within a base component in the heroes-tutorial module?

- Can you just put a component's selector tag into any template and it will insert an instance of the component? Like `<app-hero-list></app-hero-list>`

- How do you bind class members to properties of components _through_ the
  `<router-outlet >`? **/app/app.component.html**

  ```ts
  <router-outlet></router-outlet>
  <app-e-dynamic-form
  [formDataObj]="person" ></app-e-dynamic-form
  > </router-outlet>
  </div>
  ```

* In this case we're binding an `AppComponent` **class member**, `person`, to the properties of the `EDynamicFormComponent`
  - But I'd really like to give the `EDynamicFormComponent` access to the `formDataObj` as it's rendered through `<router-outlet>`
  - In React terms, how do you pass props through the router?

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
