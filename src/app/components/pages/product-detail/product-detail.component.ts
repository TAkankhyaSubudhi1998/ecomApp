import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  public product: any = [];
  public quantity = 0;
  public loading = true;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.productById(productId).subscribe((response: any) => {
        this.product = response;
        this.updateQuantity();
      this.loading = false;

      })
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.updateQuantity();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.updateQuantity();
  }

  updateQuantity() {
    this.quantity = this.cartService.getQuantity(this.product?.id);
  }

}
