import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-milksupply',
  templateUrl: './view-milksupply.component.html',
  styleUrls: ['./view-milksupply.component.scss']
})
export class ViewMilksupplyComponent implements OnInit {

  storeSelected: string;
  entries: Array<any> = [];
  stores: Array<any>;
  totala1milksupplied: number = 0;
  totala2milksupplied: number = 0;
  totalbuffalomilksupplied: number = 0;
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

  storeChange(value) {
    this.storeSelected = value;

    if (this.storeSelected) {
      this.getData();
    }
    else {
      this.toastr.error('Select a store');
    }
  }

  getData() {
    let payload = {
      store: this.storeSelected
    }
    this.apiservice.listTodayMilkSupplies(payload)
      .subscribe((data: any) => {
        if (data?.success) {
          this.entries = data?.entry;
          let totala1milksupplied = 0;
          let totala2milksupplied = 0;
          let totalbuffalomilksupplied = 0;
          data.entry?.map((item: any) => {
            if (item?.product?.milktype === 'a1milk') {
              totala1milksupplied = item?.quantity + totala1milksupplied;
            } else if (item?.product?.milktype === 'a2milk') {
              totala2milksupplied = item?.quantity + totala2milksupplied;
            } else if (item?.product?.milktype === 'buffalomilk') {
              totalbuffalomilksupplied = item?.quantity + totalbuffalomilksupplied;
            }
          })
          this.totala1milksupplied = totala1milksupplied;
          this.totala2milksupplied = totala2milksupplied;
          this.totalbuffalomilksupplied = totalbuffalomilksupplied;
        } else {
          this.toastr.error(data?.message);
        }
      })
  }

}
