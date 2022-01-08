import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { TableModule, IconsModule } from 'angular-bootstrap-md';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuard } from "../service/auth-guard/auth.guard";
import { MaterialModule } from '../shared/material/material.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { CostComponent } from './cost/cost.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { SharedModule } from "../shared/shared.module";
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { StockHistoryComponent } from './stock-history/stock-history.component';
import { AddCostComponent } from './add-cost/add-cost.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { ViewUserprofileComponent } from './view-userprofile/view-userprofile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PastSessionsComponent } from './past-sessions/past-sessions.component';
import { PastUsersalesComponent } from './past-usersales/past-usersales.component';
import { ViewSessionComponent } from './view-session/view-session.component';
import { AddMilkcardComponent } from './add-milkcard/add-milkcard.component';
import { ViewMilkcardComponent } from './view-milkcard/view-milkcard.component';
import { OrdersbypaymethodComponent } from './ordersbypaymethod/ordersbypaymethod.component';
import { CustomersComponent } from './customers/customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { TodaysStockComponent } from './todays-stock/todays-stock.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'cost', component: CostComponent, canActivate: [AuthGuard] },
    { path: 'add-milkcard', component: AddMilkcardComponent, canActivate: [AuthGuard] },
    { path: 'view-milkcard', component: ViewMilkcardComponent, canActivate: [AuthGuard] },
    { path: 'add-cost', component: AddCostComponent, canActivate: [AuthGuard] },
    { path: 'product', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
    { path: 'edit-product', component: EditProductComponent, canActivate: [AuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard] },
    { path: 'view-stock', component: ViewStockComponent, canActivate: [AuthGuard] },
    { path: 'today-stock', component: TodaysStockComponent, canActivate: [AuthGuard] },
    { path: 'stock-history', component: StockHistoryComponent, canActivate: [AuthGuard] },
    { path: 'todays-sales', component: DailySalesComponent, canActivate: [AuthGuard] },
    { path: 'add-stock', component: AddStockComponent, canActivate: [AuthGuard] },
    { path: 'order-detail', component: OrderDetailComponent, canActivate: [AuthGuard] },
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
    { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard] },
    { path: 'view-user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'view-userprofile', component: ViewUserprofileComponent, canActivate: [AuthGuard] },
    { path: 'past-sessions', component: PastSessionsComponent, canActivate: [AuthGuard] },
    { path: 'past-sales', component: PastUsersalesComponent, canActivate: [AuthGuard] },
    { path: 'past-sessions', component: PastSessionsComponent, canActivate: [AuthGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
    { path: 'view-customer', component: ViewCustomerComponent, canActivate: [AuthGuard] },
];

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
        SharedModule,
    ],
    declarations: [
        OrderDetailComponent,
        OrdersComponent,
        CostComponent,
        ProductsComponent,
        AddProductComponent,
        EditProductComponent,
        AddCategoryComponent,
        CategoryComponent,
        AddStockComponent,
        DailySalesComponent,
        ViewStockComponent,
        StockHistoryComponent,
        AddCostComponent,
        AddUserComponent,
        UserComponent,
        ViewUserprofileComponent,
        EditUserComponent,
        PastSessionsComponent,
        PastUsersalesComponent,
        ViewSessionComponent,
        AddMilkcardComponent,
        ViewMilkcardComponent,
        OrdersbypaymethodComponent,
        CustomersComponent,
        ViewCustomerComponent,
        TodaysStockComponent
    ],
    providers: [
        AuthGuard
    ]

})

export class PagesModule { }