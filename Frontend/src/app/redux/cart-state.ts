import { CartModel } from '../models/cart.model';

export class CartState {
  public cart: CartModel = null;
}

export enum CartActionType {
  CartDownloaded = 'CartDownloaded',
  CartAdded = 'CartAdded',
  CartUpdated = 'CartUpdated',
}

export interface CartAction {
  type: CartActionType;
  payload: CartModel;
}

export function cartReducer(
  currentState: CartState = new CartState(),
  action: CartAction
): CartState {
  const newState = { ...currentState };

  switch (action.type) {
    case CartActionType.CartDownloaded:
    case CartActionType.CartAdded:
    case CartActionType.CartUpdated:
      newState.cart = action.payload;
      break;
  }

  return newState;
}
