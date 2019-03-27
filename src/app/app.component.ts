import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {}
  title = 'Angular tutorials';

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
