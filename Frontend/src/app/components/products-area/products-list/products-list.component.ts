import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  constructor() {}
  public showSideBar = 'true';
  ngOnInit(): void {}
  public handleSideBar() {
    if (this.showSideBar === 'true') {
      this.showSideBar = 'false';
    } else {
      this.showSideBar = 'true';
    }
    console.log(this.showSideBar)
  }
}
