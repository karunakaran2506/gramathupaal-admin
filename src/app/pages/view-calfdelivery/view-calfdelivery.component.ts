import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-calfdelivery',
  templateUrl: './view-calfdelivery.component.html',
  styleUrls: ['./view-calfdelivery.component.scss']
})
export class ViewCalfdeliveryComponent implements OnInit {

  storeSelected: string;
  calfDelivery: Array<any>;
  stores: Array<any>;
  p = 1;

  constructor(
    private apiservice: ApiService
  ) { }

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.stores = data.stores;
        this.changeValue(data.stores[0]._id);
      })
  }

  changeValue(value) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.viewCalfDelivery(data)
      .subscribe((data: any) => {
        this.calfDelivery = data?.data;
      })
  }

}
