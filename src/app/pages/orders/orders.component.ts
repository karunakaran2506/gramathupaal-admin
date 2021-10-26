import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  storeSelected : string;
  orders : Array<any>;
  stores : Array<any>;
  p=1;

  constructor(
    private apiservice : ApiService,
    private router : Router
  ) { }

  ngOnInit(){

    this.apiservice.listStores()
     .subscribe((data:any)=>{
       console.log('data', data);
       this.stores = data.stores;
     })
  }

  changeValue(value){
    this.storeSelected = value; 
    let data = {
      store : this.storeSelected
    }
    this.apiservice.listOrders(data)
     .subscribe((data:any)=>{
       console.log('data', data);
       this.orders = data.orders;
     })
  }

  vieworderdetail(data) {
    this.apiservice.orderselected = data;
    this.router.navigateByUrl('/order-detail');
  }

}
