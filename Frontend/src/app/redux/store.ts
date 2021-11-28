import { combineReducers, createStore, StoreEnhancer } from 'redux';
import { authReducer } from './auth-state';
import { cartReducer } from './cart-state';
import { itemsReducer } from './items-state';
import { ordersReducer } from './orders-state';
import { productsReducer } from './products-state';

const reducers = combineReducers({
  authState: authReducer,
  productsState: productsReducer,
  ordersState: ordersReducer,
  cartState: cartReducer,
  itemsState: itemsReducer,
});
// for debugging purposes
type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};

const isReduxDevtoolsExtensionExist = (
  arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
  return '__REDUX_DEVTOOLS_EXTENSION__' in arg;
};
const store = createStore(
  reducers,
  isReduxDevtoolsExtensionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);
export type RootState = ReturnType<typeof reducers>;
export default store;
