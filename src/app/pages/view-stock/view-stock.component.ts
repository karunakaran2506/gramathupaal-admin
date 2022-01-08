import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss']
})
export class ViewStockComponent implements OnInit {

  storeSelected: string;
  dateSelected: string;
  stockEntries: Array<any> = [];
  category: Array<any> = [];
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
    this.totalexpense = 0;
    this.totalincome = 0;

    if (this.storeSelected) {
      let data = {
        store: this.storeSelected
      }

      this.apiservice.listCategory(data)
       .subscribe((data:any)=>{
         this.category = data.category;
       })
      this.apiservice.listStockEntries(data)
        .subscribe((data: any) => {
          this.stockEntries = data.entries;
        })
    }
    else {
      this.toastr.error('Select a store');
    }
  }

  viewStockHistory(data){
    console.log('data', data);
    this.apiservice.stockSelected = data;
    this.router.navigateByUrl('stock-history');
  }

}