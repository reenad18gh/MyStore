import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private productsSrv: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsSrv.getProductById(id).subscribe(p => (this.product = p));
  }

  add() {
    if (this.product) {
      this.cart.add(this.product, this.qty);
      alert(`Added ${this.qty} × ${this.product.name} to cart`);
    }
  }
}
