import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  constructor(private apiservice: ApiService, public dialog: MatDialog) { }
  user: any;
  orders: Array<any> = [];
  tokens: Array<any> = [];
  milkcard: Array<any> = [];
  p = 1;
  totalamount = 0;


  ngOnInit() {
    this.user = this.apiservice?.customerSelected;

    let payload = {
      customer: this.user?._id
    }
    this.apiservice.listOrdersbyCustomer(payload)
      .subscribe((data: any) => {
        this.orders = data?.orders;
        let totalSales = 0;
        this.orders?.map((x: any) => {
          totalSales = x?.totalamount + totalSales;
        })
        this.totalamount = totalSales;
      })

      this.apiservice.listProductTokenbyCustomer(payload)
       .subscribe((data:any) => {
          this.tokens = data?.token;
       })
       
       this.apiservice.listMilkcardEntrybyCustomer(payload)
       .subscribe((data:any) => {
          this.milkcard = data?.entry;
       })
  }

  openDialog(order: any) {
    this.apiservice.orderselected = order;
    this.dialog.open(OrderDetailComponent);
  }

}
