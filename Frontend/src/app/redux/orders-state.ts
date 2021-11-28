import { OrderModel } from './../models/order.model';
export class OrdersState {
  public orders: OrderModel[] = [];
}

// Orders Action Type:
export enum OrdersActionType {
  OrdersDownloaded = 'OrdersDownloaded',
  OrderAdded = 'OrderAdded',
  OrderUpdated = 'OrderUpdated',
}

// Orders Action:
export interface OrdersAction {
  type: OrdersActionType;
  payload: any;
}

export function ordersReducer(
  currentState: OrdersState = new OrdersState(),
  action: OrdersAction
): OrdersState {
  const newState = { ...currentState };

  switch (action.type) {
    case OrdersActionType.OrdersDownloaded:
      newState.orders = action.payload;
      break;
    case OrdersActionType.OrderAdded:
      newState.orders.push(action.payload);
      break;
    case OrdersActionType.OrderUpdated:
      const indexToUpdate = newState.orders.findIndex(
        (p) => p._id === action.payload._id
      );
      newState.orders[indexToUpdate] = action.payload;
      break;
  }

  // Return the new state:
  return newState;
}
