import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-e-dynamic-form',
  templateUrl: './e-dynamic-form.component.html',
  styles: []
})
export class DynamicFormComponent implements OnInit {
  constructor(public activeRoute: ActivatedRoute, private router: Router) {}
  form: FormGroup;
  formDataObj;
  personProps = [];
  urlParam;

  onSave(name) {
    // redirect to page with updated query param—either option works
    // this.router.navigateByUrl(`/egghead/${name}`);
    this.router.navigate([`../${name}`], {
      relativeTo: this.activeRoute,
      preserveQueryParams: true
    });
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.formDataObj = data.person;
    });

    // this.urlParam = this.activeRoute.snapshot.params.urlParam;
    this.activeRoute.params.subscribe(data => {
      this.urlParam = data.urlParam;
    });

    const formDataObj = {};
    for (const prop of Object.keys(this.formDataObj)) {
      formDataObj[prop] = new FormControl(
        this.formDataObj[prop].value,
        this.mapValidator(this.formDataObj[prop].validators)
      );

      this.personProps.push({
        key: prop,
        label: this.formDataObj[prop].label,
        type: this.formDataObj[prop].type,
        options: this.formDataObj[prop].options
      });
    }

    this.form = new FormGroup(formDataObj);
  }

  mapValidator(validators) {
    if (validators) {
      return Object.keys(validators).map(validationType => {
        if (validationType === 'required') {
          return Validators.required;
        } else if (validationType === 'min') {
          return Validators.min(validators[validationType]);
        }
      });
    }
    return [];
  }
}
