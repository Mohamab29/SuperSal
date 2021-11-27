import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
