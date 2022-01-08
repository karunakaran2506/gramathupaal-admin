import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-todays-stock',
  templateUrl: './todays-stock.component.html',
  styleUrls: ['./todays-stock.component.scss']
})
export class TodaysStockComponent implements OnInit {

  storeSelected: string;
  dateSelected: string;
  stockEntries: Array<any> = [];
  category: Array<any> = [];
  milkCategory: Array<any> = [];
  otherCategory: Array<any> = [];
  stores: Array<any>;
  totalincome: number = 0;
  totalexpense: number = 0;
  p=1;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router : Router
  ) { }

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]._id;
        this.stores = data?.stores;
        this.storeChange(this.storeSelected);
      })
  }

  storeChange(value) {
    this.storeSelected = value;

    if (this.storeSelected) {
      let data = {
        store: this.storeSelected
      }

      this.apiservice.listCategory(data)
       .subscribe((data:any) => {
         this.category = data?.category;
         this.milkCategory = data?.category?.filter((category:any) => category.categorytype === 'milk');
         this.otherCategory = data?.category?.filter((category:any) => category.categorytype === 'others');
       })
      this.apiservice.listTodayStockBalance(data)
        .subscribe((data: any) => {
          this.stockEntries = data.entries;
        })
    }
    else {
      this.toastr.error('Select a store');
    }
  }

}
