import { Routes } from '@angular/router';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { CartComponent } from './components/pages/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
    },
    {
        path: 'product',
        component: ProductListComponent
    },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
];
