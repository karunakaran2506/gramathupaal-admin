import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-userwise-stock',
  templateUrl: './view-userwise-stock.component.html',
  styleUrls: ['./view-userwise-stock.component.scss'],
})
export class ViewUserwiseStockComponent implements OnInit {
  storeSelected: string;
  dateSelected: Date = new Date();
  userSelected: string;
  stockEntries: Array<any> = [];
  category: Array<any> = [];
  milkCategory: Array<any> = [];
  otherCategory: Array<any> = [];
  stores: Array<any>;
  users: Array<any>;
  totalincome: number = 0;
  totalexpense: number = 0;
  totala1milk: any;
  totala2milk: any;
  totalbuffalomilk: any;
  stockType: any = 'others';
  startTime = '05:00 AM';
  endTime = '09:00 AM';
  p = 1;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]._id;
      this.stores = data?.stores;
      this.apiservice
        .viewUsers({ store: this.storeSelected })
        .subscribe((data: any) => {
          this.users = data.users;
          this.userSelected = data?.users[0]?._id;
        });
      this.fetchData();
    });
  }

  changeUser() {
    const payload = {
      store: this.storeSelected,
    };
    this.apiservice.viewUsers(payload).subscribe((data: any) => {
      this.users = data.users;
    });
  }

  typeChange(value: string) {
    this.stockType = value;
  }

  timeChanged(value: any, type: string) {
    if (type === 'start') {
      this.startTime = value;
    } else {
      this.endTime = value;
    }
    this.fetchData();
  }

  fetchData() {
    this.totalexpense = 0;
    this.totalincome = 0;

    if (this.storeSelected) {
      let data = {
        store: this.storeSelected,
        user: this.userSelected,
        date: this.dateSelected,
        startTime: this.startTime,
        endTime: this.endTime,
      };

      this.apiservice.listCategory(data).subscribe((data: any) => {
        this.category = data?.category;
        this.milkCategory = data?.category?.filter(
          (category: any) => category.categorytype === 'milk'
        );
        this.otherCategory = data?.category?.filter(
          (category: any) => category.categorytype === 'others'
        );
      });
      this.apiservice.listUserwiseStockEntries(data).subscribe((data: any) => {
        this.stockEntries = data?.entries;
        let totala1milksoldout = 0;
        let totalbuffalomilksoldout = 0;
        let totala2milksoldout = 0;
        data.entries?.forEach((item: any) => {
          if (item?.product?.milktype === 'a1milk') {
            if (item?.product?.unit === 'litre') {
              totala1milksoldout = (item?.userStockOut * item?.product?.quantity) + totala1milksoldout;
            } else {
              totala1milksoldout = (item?.userStockOut * (item?.product?.quantity / 1000)) + totala1milksoldout;
            }
          } else if (item?.product?.milktype === 'a2milk') {
            if (item?.product?.unit === 'litre') {
              totala2milksoldout = (item?.userStockOut * item?.product?.quantity) + totala2milksoldout;
            } else {
              totala2milksoldout = (item?.userStockOut * (item?.product?.quantity / 1000)) + totala2milksoldout;
            }
          } else if (item?.product?.milktype === 'buffalomilk') {
            if (item?.product?.unit === 'litre') {
              totalbuffalomilksoldout = (item?.userStockOut * item?.product?.quantity) + totalbuffalomilksoldout;
            } else {
              totalbuffalomilksoldout = (item?.userStockOut * (item?.product?.quantity / 1000)) + totalbuffalomilksoldout;
            }
          }
        });

        this.totala1milk = {
          soldOut: totala1milksoldout
        };
        this.totala2milk = {
          soldOut: totala2milksoldout,
        };
        this.totalbuffalomilk = {
          soldOut: totalbuffalomilksoldout,
        };
      });
    } else {
      this.toastr.error('Select a store');
    }
  }
}
