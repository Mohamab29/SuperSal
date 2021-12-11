import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user = store.getState().authState.user;
  public unsubscribe: Unsubscribe;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }
  public logout(): void {
    this.router.navigateByUrl('/logout', { replaceUrl: true });
  }
}
