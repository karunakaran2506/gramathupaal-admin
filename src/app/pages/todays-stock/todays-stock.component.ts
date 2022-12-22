import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-todays-stock',
  templateUrl: './todays-stock.component.html',
  styleUrls: ['./todays-stock.component.scss'],
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
  startTime = '12:00 AM';
  endTime = '11:59 PM';
  p = 1;

  constructor(private apiservice: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]._id;
      this.stores = data?.stores;
      this.storeChange(this.storeSelected);
    });
  }

  typeChange(value) {
    this.stockType = value;
  }

  timeChanged(value: any, type: string) {
    if (type === 'start') {
      this.startTime = value;
    } else {
      this.endTime = value;
    }
    this.storeChange(this.storeSelected);
  }

  storeChange(value: any) {
    this.storeSelected = value;

    if (this.storeSelected) {
      let payload = {
        store: this.storeSelected,
        startTime: this.startTime,
        endTime: this.endTime,
      };

      this.apiservice.listCategory(payload).subscribe((data: any) => {
        this.category = data?.category;
        this.milkCategory = data?.category?.filter(
          (category: any) => category.categorytype === 'milk'
        );
        this.otherCategory = data?.category?.filter(
          (category: any) => category.categorytype === 'others'
        );
      });
      this.apiservice.listTodayStockBalance(payload).subscribe((data: any) => {
        this.stockEntries = data?.entries;
        let totala1milkstockin = 0;
        let totala1milkstockout = 0;
        let totala1milkbyproduct = 0;
        let totala2milkstockin = 0;
        let totala2milkstockout = 0;
        let totala2milkbyproduct = 0;
        let totalbuffalomilkstockin = 0;
        let totalbuffalomilkstockout = 0;
        let totalbuffalomilkbyproduct = 0;
        data.entries?.map((item: any) => {
          if (item?.product?.milktype === 'a1milk') {
            totala1milkstockin = item?.totalStockIn + totala1milkstockin;
            totala1milkstockout = item?.totalStockOut + totala1milkstockout;
            totala1milkbyproduct = item?.totalByproduct + totala1milkbyproduct;
          } else if (item?.product?.milktype === 'a2milk') {
            totala2milkstockin = item?.totalStockIn + totala2milkstockin;
            totala2milkstockout = item?.totalStockOut + totala2milkstockout;
            totala2milkbyproduct = item?.totalByproduct + totala2milkbyproduct;
          } else if (item?.product?.milktype === 'buffalomilk') {
            totalbuffalomilkstockin =
              item?.totalStockIn + totalbuffalomilkstockin;
            totalbuffalomilkstockout =
              item?.totalStockOut + totalbuffalomilkstockout;
            totalbuffalomilkbyproduct =
              item?.totalByproduct + totalbuffalomilkbyproduct;
          }
        });

        this.totala1milk = {
          stockIn: totala1milkstockin,
          stockOut: totala1milkstockout,
          byproduct: totala1milkbyproduct,
          available:
            totala1milkstockin - (totala1milkstockout + totala1milkbyproduct),
        };
        this.totala2milk = {
          stockIn: totala2milkstockin,
          stockOut: totala2milkstockout,
          byproduct: totala2milkbyproduct,
          available:
            totala2milkstockin - (totala2milkstockout + totala2milkbyproduct),
        };
        this.totalbuffalomilk = {
          stockIn: totalbuffalomilkstockin,
          stockOut: totalbuffalomilkstockout,
          byproduct: totalbuffalomilkbyproduct,
          available:
            totalbuffalomilkstockin -
            (totalbuffalomilkstockout + totalbuffalomilkbyproduct),
        };
      });
    } else {
      this.toastr.error('Select a store');
    }
  }
}
