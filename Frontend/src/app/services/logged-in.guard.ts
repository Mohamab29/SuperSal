import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private notify: NotifyService) {}
  canActivate() {
    if (!store.getState().authState.user) return true;

    this.notify.error('You are logged-in');

    this.router.navigateByUrl('/home', { replaceUrl: true });

    return false;
  }
}
