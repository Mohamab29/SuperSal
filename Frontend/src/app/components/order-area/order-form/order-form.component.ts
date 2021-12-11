import { ItemModel } from './../../../models/item.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/orders.service';
import store from 'src/app/redux/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  public order = new OrderModel();
  @Input()
  public cart: CartModel;
  @Input()
  public orderItems: ItemModel[] = [];
  public minDate: Date;
  public maxDate: Date;

  //Control
  public cityControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(40),
    Validators.minLength(2),
  ]);
  public streetControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(2),
  ]);
  public deliveryDateControl = new FormControl(null, [Validators.required]);
  public creditCardControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(16),
    Validators.minLength(7),
  ]);

  public orderForm = new FormGroup({
    cityControl: this.cityControl,
    streetControl: this.streetControl,
    deliveryDateControl: this.deliveryDateControl,
    creditCardControl: this.creditCardControl,
  });

  constructor(
    private orderService: OrderService,
    private router: Router,
    private notify: NotifyService
  ) {
    const currentDate = new Date();
    this.minDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    this.maxDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
  }

  ngOnInit(): void {

  }
  public submitOrder() {}
}
