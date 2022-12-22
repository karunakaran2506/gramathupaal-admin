import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-feedstock',
  templateUrl: './view-feedstock.component.html',
  styleUrls: ['./view-feedstock.component.scss'],
})
export class ViewFeedstockComponent implements OnInit {
  storeSelected: string;
  dateSelected: Date = new Date();
  stockEntries: Array<any> = [];
  stores: Array<any>;
  p = 1;

  constructor(private apiservice: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]._id;
      this.stores = data?.stores;
      this.fetchData();
    });
  }

  fetchData() {
    let data = {
      store: this.storeSelected,
      date: this.dateSelected,
    };

    this.apiservice.listFeedStock(data).subscribe((data: any) => {
      this.stockEntries = data?.entries;
    });
  }
}
