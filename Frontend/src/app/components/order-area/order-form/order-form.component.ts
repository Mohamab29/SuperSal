import { CartService } from 'src/app/services/carts.service';
import { ItemModel } from './../../../models/item.model';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel, StatusType } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/orders.service';
import store from 'src/app/redux/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  public order = new OrderModel();
  @Input()
  public cart: CartModel;
  @Input()
  public orderItems: ItemModel[] = [];
  @Input()
  public totalPrice = 0;

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
    private cartService: CartService,
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

  public async submitOrder() {
    try {
      this.order.city = this.cityControl.value;
      this.order.street = this.streetControl.value;
      this.order.creditCard = this.creditCardControl.value;
      this.order.deliveryDate = this.deliveryDateControl.value;
      this.order.cartId = this.cart._id;
      this.order.userId = this.cart.userId;
      this.order.finalPrice = this.totalPrice;
      await this.orderService.addOrderAsync(this.order);
      this.cart.status = StatusType.CLOSED;
      await this.cartService.updateCartStatus(this.cart);
      this.notify.success('Order is complete');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      this.notify.error(error);
    }
  }
}
