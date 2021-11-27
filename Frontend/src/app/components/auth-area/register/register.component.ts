import { AuthService } from './../../../services/auth.service';
import { UserModel } from './../../../models/user.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public successFirst = false;
  public user = new UserModel();
  public passwordsMatch = true;

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router,
    private notify: NotifyService
  ) {}
  public onChangePassword() {
    if (this.user.password === this.user.confirmPassword) {
      this.passwordsMatch = true;
      return;
    }
    this.passwordsMatch = false;
    return;
  }
  public checkFirstStep() {
    if (this.user.username && this.user.password && this.user._id) {
      this.successFirst = true;
      return;
    } else {
      return this.notify.error('You need to complete the first step first...');
    }
  }
  public log(something: string) {
    console.log(something);
  }
  public backToFirst = () => {
    this.successFirst = false;
    return;
  };
  public async register() {
    try {
      await this.myAuthService.register(this.user);
      this.notify.success('Registered successfully ...');
      this.myRouter.navigateByUrl('/home');
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
