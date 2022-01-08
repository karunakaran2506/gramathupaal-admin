import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  storeSelected: string;
  orders: Array<any>;
  stocks: Array<any>;
  stores: Array<any>;
  viewType = 'order';
  totalSales : number = 0.00;
  dateSelected: Date = new Date();
  p = 1;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.stores = data.stores;
        this.storeSelected = data?.stores[0]?._id;
        this.getData();
      })
  }

  openDialog(order) {
    this.apiservice.orderselected = order;
    this.dialog.open(OrderDetailComponent);
  }

  changeValue(value) {
    this.storeSelected = value;
    this.datechange(this.dateSelected);
  }

  datechange(value) {
    this.dateSelected = value;
    if (this.storeSelected) {
      this.getData();
    }
    else {
      this.toastr.error('Select a store');
    }
  }

  typeChange(value) {
    this.viewType = value;
    this.getData();
  }

  getData() {
    let data = {
      date: this.dateSelected,
      store: this.storeSelected
    }
    if (this.viewType === 'order') {
      this.apiservice.listOrders(data)
        .subscribe((data: any) => {
          this.orders = data.orders;
          let totalSales = 0;
          this.orders.map((x:any)=>{
            totalSales = x?.totalamount + totalSales;
          })
          this.totalSales = totalSales;
        })

    } else {
      this.apiservice.listStockEntriesByDate(data)
        .subscribe((data: any) => {
          this.stocks = data.entries;
          let totalSales = 0;
          this.stocks.map((x:any)=>{
            totalSales = (x.quantity * x?.product?.price) + totalSales;
          })
          this.totalSales = totalSales;
        })
    }
  }

  viewCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.router.navigateByUrl('/view-customer');
  }

}