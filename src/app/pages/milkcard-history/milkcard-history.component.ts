import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-milkcard-history',
  templateUrl: './milkcard-history.component.html',
  styleUrls: ['./milkcard-history.component.scss']
})
export class MilkcardHistoryComponent implements OnInit {

  storeSelected: string;
  dateSelected: Date = new Date();
  history: Array<any>;
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
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data.stores;
        this.datechange(this.dateSelected);
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
      this.apiservice.listMilkcardHistorybyStore(data)
        .subscribe((data: any) => {
          this.history = data.history;
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
    } else {
      this.toastr.error('Select a date');
    }
  }

}
