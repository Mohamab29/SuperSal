import { ItemModel } from 'src/app/models/item.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css'],
})
export class OrderCartComponent implements OnInit {
  @Input()
  public totalPrice: number = 0;
  @Input()
  public orderItems: ItemModel[];
  constructor() {}

  ngOnInit(): void {}
}
