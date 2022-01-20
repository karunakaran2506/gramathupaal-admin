import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private apiservice: ApiService, private router: Router) { }

  p = 1;
  term : any;
  storeSelected: string;
  stores: Array<any> = [];
  customer: Array<any> = [];

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data.stores;
        this.changeValue(this.storeSelected);
      })
  }

  viewCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.router.navigateByUrl('/view-customer');
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.viewCustomerbyStore(this.storeSelected)
      .subscribe((data: any) => {
        this.customer = data?.customer;
      })
  }

  editCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.router.navigateByUrl('/edit-customer');
  }

}
