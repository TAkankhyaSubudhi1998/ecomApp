import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: { product: any; quantity: number }[] = [];

  private uniqueItemCountSubject = new BehaviorSubject<number>(0);
  uniqueItemCount$ = this.uniqueItemCountSubject.asObservable();


  constructor() {
    // this.updateItemCount();
    this.updateUniqueItemCount();
  }

  private updateUniqueItemCount() {
    const uniqueCount = this.items.length;
    this.uniqueItemCountSubject.next(uniqueCount);
  }

  // private updateItemCount() {
  //   const total = this.items.reduce((sum, item) => sum + item.quantity, 0);
  //   this.itemCountSubject.next(total);
  // }

  addToCart(product: any) {
    const found = this.items.find(i => i.product.id === product.id);
    if (found) {
      found.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.updateUniqueItemCount();
  }

  removeFromCart(productId: number) {
    const index = this.items.findIndex(i => i.product.id === productId);
    if (index > -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity -= 1;
      } else {
        this.items.splice(index, 1);
      }
    }
    this.updateUniqueItemCount();
  }

  getItems() {
    return this.items;
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getQuantity(productId: number): number {
    const found = this.items.find(i => i.product.id === productId);
    return found ? found.quantity : 0;
  }
}
