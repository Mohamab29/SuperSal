import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  public user = store.getState().authState.user;
  public unsubscribe: Unsubscribe;
  constructor(
    private authService: AuthService,
    private notify: NotifyService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.unsubscribe = store.subscribe(() => {
        this.user = store.getState().authState.user;
      });
      this.authService.logout();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      this.notify.error(error);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
