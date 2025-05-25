import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../../services/cart.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  public cartItems: any[] = [];
  public total = 0;
  public isMobile = false;

  private cartService = inject(CartService);
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    // this.onResize();
    this.loadCart();
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  add(product: any) {
    this.cartService.addToCart(product);
    this.loadCart();
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

}
