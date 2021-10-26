import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuard } from "../service/auth-guard/auth.guard";
import { MaterialModule } from '../shared/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { TableModule, IconsModule } from 'angular-bootstrap-md';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { CostComponent } from './cost/cost.component';
import { StockComponent } from './stock/stock.component';
import { ProductsComponent } from './products/products.component';

const routes : Routes = [
    { path : '', component : DashboardComponent , pathMatch : 'full', canActivate : [AuthGuard]},
    { path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard]},
    { path : 'orders', component : OrdersComponent, canActivate : [AuthGuard]},
    { path : 'cost', component : CostComponent, canActivate : [AuthGuard]},
    { path : 'product', component : ProductsComponent, canActivate : [AuthGuard]},
    { path : 'stock', component : StockComponent, canActivate : [AuthGuard]},
    { path : 'order-detail', component : OrderDetailComponent, canActivate : [AuthGuard]},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MaterialModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule,
        TableModule,
        IconsModule,
        MDBBootstrapModule.forRoot(),
    ],
    declarations: [
      OrderDetailComponent,
      OrdersComponent,
      CostComponent,
      StockComponent,
      ProductsComponent
    ],
    providers : [
        AuthGuard
    ]

})

export class PagesModule{}