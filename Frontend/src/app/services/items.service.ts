import { ItemsActionType } from './../redux/items-state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../models/item.model';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}
  public getTotalCartPrice(items: ItemModel[]) {
    let finalPrice = 0;
    for (const item of items) {
      finalPrice += item.totalPrice;
    }
    return finalPrice;
  }
  public async getItemsByCartId(cartID: string) {
    const items = await this.http
      .get<ItemModel[]>(environment.itemsUrl + cartID)
      .toPromise();
    store.dispatch({ type: ItemsActionType.ItemsDownloaded, payload: items });
    return items;
  }
  public async addItem(item: ItemModel) {
    const addedItem = await this.http
      .post<ItemModel>(environment.itemsUrl, item)
      .toPromise();

    store.dispatch({ type: ItemsActionType.ItemAdded, payload: addedItem });
    return addedItem;
  }
  public async updateItem(item: ItemModel) {
    const updatedItem = await this.http
      .patch<ItemModel>(environment.itemsUrl, item)
      .toPromise();
    store.dispatch({ type: ItemsActionType.ItemUpdated, payload: updatedItem });
    return updatedItem;
  }
  public async deleteItem(_id: string) {
    await this.http.delete<ItemModel>(environment.itemsUrl + _id).toPromise();
    store.dispatch({ type: ItemsActionType.ItemDeleted, payload: _id });
  }
}
