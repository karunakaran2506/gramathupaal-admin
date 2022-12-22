import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-allfeedstock',
  templateUrl: './view-allfeedstock.component.html',
  styleUrls: ['./view-allfeedstock.component.scss'],
})
export class ViewAllfeedstockComponent implements OnInit {
  storeSelected: string;
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
      store: this.storeSelected
    };

    this.apiservice.listAllFeedStock(data).subscribe((data: any) => {
      this.stockEntries = data?.entries;
    });
  }
}
