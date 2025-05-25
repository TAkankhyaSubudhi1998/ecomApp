import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule,MatSelectModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  public products: any = [];
  public OriginalProductsList: any = [];
  public categories: string[] = [];
  public searchControl = new FormControl('');
  public categoryControl = new FormControl('');

  constructor(
    private productService: ProductService
  ) {
    this.productService.productList().subscribe((response: any) => {
      this.products = response;
      this.OriginalProductsList = response;
      this.categories = Array.from(new Set(response.map((p: any) => p.category)));
    })
  }

  ngOnInit(): void {

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchText: any) => {
      this.filterProducts();
    });

    this.categoryControl.valueChanges.subscribe(() => this.filterProducts());

  }

  filterProducts() {
    const search = (this.searchControl.value || '').toLowerCase();
    const selectedCategory = this.categoryControl.value;

    this.products = this.OriginalProductsList.filter((product: any) => {
      const matchesSearch = product.title.toLowerCase().includes(search);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

}
