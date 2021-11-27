import { CredentialsModel } from './../../../models/credentials.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public credentials = new CredentialsModel();
  constructor(
    private authService: AuthService,
    private myRouter: Router,
    private notify: NotifyService
  ) {}

  public async login() {
    try {
      await this.authService.login(this.credentials);
      this.notify.success('You are logged-in');
      this.myRouter.navigateByUrl('/home');
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
