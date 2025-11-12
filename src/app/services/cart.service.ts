import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

export interface OrderInfo {
  name: string;
  address: string;
  creditCard: string; // demo only
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);
  lastOrder?: OrderInfo;

  getCart() {
    return this.items$.asObservable();
  }

  getSnapshot(): CartItem[] {
    return [...this.items];
  }

  add(product: Product, quantity: number) {
    const q = Math.max(1, Math.floor(quantity || 1));
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += q;
    } else {
      this.items.push({ product, quantity: q });
    }
    this.items$.next(this.getSnapshot());
  }

  remove(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.items$.next(this.getSnapshot());
  }

  clear() {
    this.items = [];
    this.items$.next(this.getSnapshot());
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  checkout(order: Omit<OrderInfo, 'total'>) {
    const total = this.total();
    this.lastOrder = { ...order, total };
    this.clear();
  }
}
