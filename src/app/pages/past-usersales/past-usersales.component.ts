import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrdersbypaymethodComponent } from '../ordersbypaymethod/ordersbypaymethod.component';

@Component({
  selector: 'app-past-usersales',
  templateUrl: './past-usersales.component.html',
  styleUrls: ['./past-usersales.component.scss'],
})
export class PastUsersalesComponent implements OnInit {
  user: any;
  session: any;
  store: any;
  dateSelected: Date = new Date();
  orders: Array<any> = [];
  totalamount = 0;
  totalcredit: number = 0;
  totalfree: number = 0;
  totalcash: number = 0;
  totalcard: number = 0;
  totalupi: number = 0;
  totaltoken: number = 0;
  totalmilkcard: number = 0;
  p = 1;

  constructor(
    private apiservice: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.apiservice.userSelected;

    let data = {
      user: this.user?._id,
    };

    this.apiservice.viewUserDetails(data).subscribe((data: any) => {
      this.user = data?.user;
      this.session = data?.session;
      this.store = this.user?.store;
    });
    this.getValue();
  }

  openDialog(order: any) {
    this.apiservice.orderselected = order;
    this.dialog.open(OrderDetailComponent);
  }

  datechange(value) {
    this.dateSelected = value;
    this.getValue();
  }

  getValue() {
    let payload = {
      user: this.user._id,
      date: this.dateSelected,
    };

    this.apiservice.viewUserPastSales(payload).subscribe((response: any) => {
      this.orders = response?.orders;
      const data = response?.stats;
      this.totalcredit = data?.totalcredit || 0;
      this.totalmilkcard = data?.totalmilkcard || 0;
      this.totaltoken = data?.totaltoken || 0;
      this.totalupi = data?.totalupi || 0;
      this.totalcard = data?.totalcard || 0;
      this.totalcash = data?.totalcash || 0;
      this.totalfree = data?.totalfree || 0;
      let totalamount = 0;
      this.orders?.map((x: any) => {
        totalamount = x.totalamount + totalamount;
      });
      this.totalamount = totalamount;
    });
  }

  openOrders(paymentMethod: any) {
    const orders = this.orders.filter(
      (x: any) => x.paymentMethod === paymentMethod
    );
    this.dialog.open(OrdersbypaymethodComponent, {
      closeOnNavigation: true,
      data: orders,
    });
  }

  viewCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.router.navigateByUrl('/view-customer');
  }
}
