import { NotifyService } from './notify.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';


// ng g guard services/auth

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private notify: NotifyService) { }

    canActivate(): boolean {
        if(store.getState().authState.user) return true;
        console.log("here")

        this.notify.error("You are not logged-in");
        
        this.router.navigateByUrl("/home");

        return false;
    }

}
