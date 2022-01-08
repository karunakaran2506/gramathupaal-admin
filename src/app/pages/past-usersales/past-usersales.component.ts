import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-past-usersales',
  templateUrl: './past-usersales.component.html',
  styleUrls: ['./past-usersales.component.scss']
})
export class PastUsersalesComponent implements OnInit {

  user : any;
  session : any;
  store : any;
  dateSelected : Date = new Date();
  orders : Array<any> = [];
  totalamount = 0;
  p=1;

  constructor(private apiservice: ApiService, public dialog : MatDialog, private router : Router) { }

  ngOnInit() {
    this.user = this.apiservice.userSelected;

    let data = {
      user: this.user?._id
    }

    this.apiservice.viewUserDetails(data)
      .subscribe((data: any) => {
        this.user = data?.user;
        this.session = data?.session;
        this.store = this.user?.store;
      })
    this.getValue();
  }

  openDialog(order:any) {
    this.apiservice.orderselected = order;
    this.dialog.open(OrderDetailComponent);
  }

  datechange(value){
    this.dateSelected = value;
    this.getValue();
  }

  getValue(){
    let payload = {
      user: this.user._id,
      date: this.dateSelected
    }

    this.apiservice.viewUserPastSales(payload)
     .subscribe((data:any)=>{
       this.orders = data?.orders;
       let totalamount = 0;
       this.orders?.map((x:any)=>{
        totalamount = x.totalamount + totalamount;
       })
       this.totalamount = totalamount;
     })
  }

  viewCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.router.navigateByUrl('/view-customer');
  }

}
