import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productsSrv: ProductService, private cart: CartService) {}

  ngOnInit(): void {
    this.productsSrv.getProducts().subscribe(list => {
      this.products = list;
      this.loading = false;
    });
  }

  handleAdd(p: Product, qty: number) {
    this.cart.add(p, qty);
    alert(`Added ${qty} × ${p.name} to cart`);
  }
}
