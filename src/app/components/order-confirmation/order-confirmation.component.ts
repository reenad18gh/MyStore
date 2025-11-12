import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html'
})
export class OrderConfirmationComponent {
  order = this.cart.lastOrder;

  constructor(private cart: CartService) {}
}
