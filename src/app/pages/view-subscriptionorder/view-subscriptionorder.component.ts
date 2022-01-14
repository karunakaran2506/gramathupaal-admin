import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-subscriptionorder',
  templateUrl: './view-subscriptionorder.component.html',
  styleUrls: ['./view-subscriptionorder.component.scss']
})
export class ViewSubscriptionorderComponent implements OnInit {

  constructor(private apiservice: ApiService, private router : Router) { }

  p = 1;
  storeSelected: string;
  stores: Array<any> = [];
  order: Array<any> = [];

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data.stores;
        this.changeValue(this.storeSelected);
      })
  }

  changeValue(value:any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.listSubscriptionorderbyStore(data)
      .subscribe((data: any) => {
        this.order = data?.order;
      })
  }

}
