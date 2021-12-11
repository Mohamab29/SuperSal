import { CartService } from 'src/app/services/carts.service';
import { ItemModel } from './../../../models/item.model';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import { CartModel } from 'src/app/models/cart.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public orderItems: ItemModel[] = [];
  public cart: CartModel;
  public totalPrice: number = 0;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private router: Router,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      const user = store.getState().authState.user;
      this.cart = await this.cartService.getCartByUserIdAndLatest(user._id);
      this.orderItems = await this.itemService.getItemsByCartId(this.cart._id);
      this.totalPrice = await this.itemService.getTotalCartPrice(
        this.orderItems
      );
    } catch (error) {
      this.notify.error(error);
    }
  }
}
