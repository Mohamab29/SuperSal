export enum StatusType {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  EMPTY = 'EMPTY',
}
export class CartModel {
  createdAt: Date;
  status: StatusType;
  _id: string;
  userId: string;
}
