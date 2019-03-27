import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  form: FormGroup;
  isDirty = false;
  editedName: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router,
    private location: Location
  ) {
    this.form = new FormGroup({
      name: new FormControl()
    });
  }

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

  goBack(): void {
    // this.location.back();
    this.router.navigate([`../../heroes`], {
      relativeTo: this.route
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
}
