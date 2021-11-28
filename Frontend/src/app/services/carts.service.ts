import { CartActionType } from '../redux/cart-state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart.model';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  public async getCartById(_id: string) {
    const cart = await this.http
      .get<CartModel[]>(environment.cartsUrl + _id)
      .toPromise();
    store.dispatch({ type: CartActionType.CartDownloaded, payload: cart[0] });
    return cart[0];
  }
  public async getCartByUserIdAndLatest(userId: string) {
    const cart = await this.http
      .get<CartModel[]>(environment.cartsByUserIdUrl + userId + '?latest=true')
      .toPromise();
    store.dispatch({ type: CartActionType.CartDownloaded, payload: cart[0] });
    return cart[0];
  }
  public async addCart(cart: CartModel) {
    const addedCart = await this.http
      .post<CartModel>(environment.cartsUrl, cart)
      .toPromise();
    store.dispatch({ type: CartActionType.CartAdded, payload: addedCart });
    return addedCart;
  }
  public async updateCartStatus(cart: CartModel) {
    const updatedCart = await this.http
      .patch<CartModel>(environment.cartsUrl, cart)
      .toPromise();
    store.dispatch({ type: CartActionType.CartUpdated, payload: updatedCart });
    return updatedCart;
  }
}
