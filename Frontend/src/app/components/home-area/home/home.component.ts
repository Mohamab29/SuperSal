import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public user = store.getState().authState.user;

  public unsubscribe: Unsubscribe;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
    if (this.user?.isAdmin) {
      this.router.navigateByUrl('/products', { replaceUrl: true });
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
