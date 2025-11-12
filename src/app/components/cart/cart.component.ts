import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart.getCart().subscribe(items => {
      this.items = items;
      this.total = this.cart.total();
    });
  }

  remove(id: number) {
    this.cart.remove(id);
  }

  proceedCheckout() {
    this.router.navigate(['/checkout']);
  }

  clear() {
    this.cart.clear();
  }
}
