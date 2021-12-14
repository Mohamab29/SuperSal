import { NotifyService } from './notify.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

// ng g guard services/auth

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notify: NotifyService,
    private http: HttpClient
  ) {}

  async canActivate(): Promise<boolean>{
    try {
      if (store.getState().authState.user) {
        // const response = await this.http.get<
        // HttpErrorResponse | HttpResponse<Response>
        // >(environment.isLoggedInUrl).toPromise();
        // console.log(response);

        return true;
      }

      this.notify.error('You are not logged-in');

      this.router.navigateByUrl('/home');

      return false;
    } catch (error:any) {
      this.notify.error(error);
      return false;
    }
  }
}
