import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productName: string = 'A Book';

  products = [
    'A NoteBook',
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    this.products.push(this.productName);
  }

  productDelete(prod: string) {
    this.products = this.products.filter(p => p !== prod);
  }

}
