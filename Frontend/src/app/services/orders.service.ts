import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import { OrdersActionType } from '../redux/orders-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public async getAllOrdersAsync(): Promise<OrderModel[]> {
    const orders = await this.http
      .get<OrderModel[]>(environment.ordersUrl)
      .toPromise();
    store.dispatch({
      type: OrdersActionType.OrdersDownloaded,
      payload: orders,
    });
    return orders;
  }
  public async getOrderByIdAsync(_id: string): Promise<OrderModel> {
    return await this.http
      .get<OrderModel>(environment.ordersUrl + _id)
      .toPromise();
  }
  public async addOrderAsync(order: OrderModel): Promise<OrderModel> {
    const addedOrder = await this.http
      .post<OrderModel>(environment.ordersUrl, order)
      .toPromise();
    store.dispatch({
      type: OrdersActionType.OrderAdded,
      payload: addedOrder,
    });
    return addedOrder;
  }
}
