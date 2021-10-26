import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  storeSelected: string;
  dateSelected: string;
  entries: Array<any>;
  stockEntries: Array<any> = [];
  stores: Array<any>;
  totalincome: number = 0;
  totalexpense: number = 0;
  p = 1;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        console.log('data', data);
        this.stores = data.stores;
      })
  }

  datechange(value) {

    this.totalexpense = 0;
    this.totalincome = 0;

    this.dateSelected = value;

    if (this.storeSelected) {
      let data = {
        date: value,
        store: this.storeSelected
      }
      this.apiservice.listStockEntries(data)
        .subscribe((data: any) => {
          console.log('data', data);
          this.entries = data.entries;

          this.entries.map((x: any) => {
            console.log('x', x);
            let checkStock = [];
            if (this.stockEntries?.length) {
              checkStock = this.stockEntries?.filter((stock:any) => stock.product._id === x.product._id);
            }
            if (checkStock?.length === 0) {
              this.stockEntries.push(x);
            }
            else {
              this.stockEntries.map((y: any) => {
                if (y.product._id === x.product._id) { }
                y.quantity = y.quantity + x.quantity
              })
            }
          })
        })
    }
    else {
      this.toastr.error('Select a store');
    }
  }

  changeValue(value) {
    this.storeSelected = value;
    if (this.dateSelected) {
      this.datechange(this.dateSelected);
    }
  }

}
