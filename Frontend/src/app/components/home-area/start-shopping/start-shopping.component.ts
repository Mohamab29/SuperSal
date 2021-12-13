import { Router } from '@angular/router';
import { ItemService } from './../../../services/items.service';
import { CartService } from '../../../services/carts.service';
import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { CartModel, StatusType } from 'src/app/models/cart.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-start-shopping',
  templateUrl: './start-shopping.component.html',
  styleUrls: ['./start-shopping.component.css'],
})
export class StartShoppingComponent implements OnInit {
  public user = store.getState().authState.user;
  public cart = new CartModel();
  public totalPrice = 0;
  public status: StatusType | null = null;

  constructor(
    private cartService: CartService,
    private itemService: ItemService,
    private router: Router,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      this.cart = await this.cartService.getCartByUserIdAndLatest(
        this.user._id
      );
      if (this.cart) {
        this.status = this.cart.status;
        const items = await this.itemService.getItemsByCartId(this.cart._id);
        this.totalPrice = this.itemService.getTotalCartPrice(items);
      }
      if (this.user?.isAdmin) {
        this.router.navigateByUrl('/products', { replaceUrl: true });
      }
    } catch (error: any) {
      this.notify.error(error);
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('/logout');
      }
    }
  }
}
