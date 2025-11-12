import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  name = '';
  address = '';
  creditCard = '';

  constructor(private cart: CartService, private router: Router) {}

  submit(form: any) {
    if (!form.valid) return;
    this.cart.checkout({ name: this.name, address: this.address, creditCard: this.creditCard });
    this.router.navigate(['/confirmation']);
  }
}
