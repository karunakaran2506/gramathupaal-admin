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
  totala1milk: any;
  totala2milk: any;
  totalbuffalomilk: any;
  stockType: any = 'others';
  p = 1;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]._id;
        this.stores = data?.stores;
        this.storeChange(this.storeSelected);
      })
  }

  typeChange(value){
    this.stockType = value;
  }

  storeChange(value) {
    this.storeSelected = value;

    if (this.storeSelected) {
      let data = {
        store: this.storeSelected
      }

      this.apiservice.listCategory(data)
        .subscribe((data: any) => {
          this.category = data?.category;
          this.milkCategory = data?.category?.filter((category: any) => category.categorytype === 'milk');
          this.otherCategory = data?.category?.filter((category: any) => category.categorytype === 'others');
        })
      this.apiservice.listTodayStockBalance(data)
        .subscribe((data: any) => {
          this.stockEntries = data?.entries;
          let totala1milkstockin = 0;
          let totala1milkstockout = 0;
          let totala2milkstockin = 0;
          let totala2milkstockout = 0;
          let totalbuffalomilkstockin = 0;
          let totalbuffalomilkstockout = 0;
          data.entries?.map((item: any) => {
            if (item?.product?.milktype === 'a1milk') {
              totala1milkstockin = item?.totalStockIn + totala1milkstockin;
              totala1milkstockout = item?.totalStockOut + totala1milkstockout;
            } else if (item?.product?.milktype === 'a2milk') {
              totala2milkstockin = item?.totalStockIn + totala2milkstockin;
              totala2milkstockout = item?.totalStockOut + totala2milkstockout;
            } else if (item?.product?.milktype === 'buffalomilk') {
              totalbuffalomilkstockin = item?.totalStockIn + totalbuffalomilkstockin;
              totalbuffalomilkstockout = item?.totalStockOut + totalbuffalomilkstockout;
            }
          })

          this.totala1milk = {
            stockIn : totala1milkstockin,
            stockOut : totala1milkstockout,
            available : totala1milkstockin - totala1milkstockout
          };
          this.totala2milk = {
            stockIn : totala2milkstockin,
            stockOut : totala2milkstockout,
            available : totala2milkstockin - totala2milkstockout
          };
          this.totalbuffalomilk = {
            stockIn : totalbuffalomilkstockin,
            stockOut : totalbuffalomilkstockout,
            available : totalbuffalomilkstockin - totalbuffalomilkstockout
          };
        })
    }
    else {
      this.toastr.error('Select a store');
    }
  }

}
