import { UserModel } from './../../../models/user.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartModel, StatusType } from 'src/app/models/cart.model';
import { NotifyService } from 'src/app/services/notify.service';
import { CartService } from 'src/app/services/carts.service';
import store from 'src/app/redux/store';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/items.service';
import { Unsubscribe } from 'redux';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css'],
})
export class CartSidebarComponent implements OnInit, OnDestroy {
  public cart: CartModel;
  public user: UserModel = new UserModel();
  public cartItems: ItemModel[] = [];
  public cartTotalPrice = 0;
  public unsubscribeFromEvents: Unsubscribe;
  constructor(
    private notify: NotifyService,
    private cartService: CartService,
    private itemService: ItemService,
    private router: Router
  ) {}

  @Input()
  public opened: string;

  public showFiller = false;
  public updateCart(): void {
    if (!this.cartItems?.length) {
      this.cart.status = StatusType.EMPTY;
    } else {
      this.cart.status = StatusType.OPEN;
    }
  }
  public async clearItems() {
    try {
      await this.itemService.deleteAllItems(this.cart._id);
    } catch (error) {
      this.notify.error(error);
    }
  }
  public goToOrder() {
    const answer = window.confirm('Are you sure you want to go to order?');
    if (answer) {
      this.router.navigateByUrl('/order');
    }
  }
  async ngOnInit() {
    try {
      this.user = store.getState().authState.user;
      this.cart = await this.cartService.getCartByUserIdAndLatest(
        this.user._id
      );
      if (this.cart || this.cart?.status === StatusType.OPEN) {
        this.cartItems = await this.itemService.getItemsByCartId(this.cart._id);
        this.cartTotalPrice = this.cartItems?.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        this.updateCart();
        this.unsubscribeFromEvents = await store.subscribe(async () => {
          try {
            this.cartItems = store.getState().itemsState.items;
            this.cartTotalPrice = this.cartItems?.reduce(
              (sum, item) => sum + item.totalPrice,
              0
            );
            this.updateCart();
          } catch (error) {
            this.notify.error(error);
          }
        });
      }
    } catch (error: any) {
      if (error?.status === 403 || error?.status === 401) {
        this.router.navigateByUrl('/logout', { replaceUrl: true });
      }
      this.notify.error(error);
    }
  }
  async ngOnDestroy() {
    try {
      if (this.unsubscribeFromEvents) {
        this.unsubscribeFromEvents();
      }
      if (this.cart) {
        await this.cartService.updateCartStatus(this.cart);
      }
    } catch (error) {
      this.notify.error(error);
    }
  }
}
