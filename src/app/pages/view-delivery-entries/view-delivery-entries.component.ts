import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-delivery-entries',
  templateUrl: './view-delivery-entries.component.html',
  styleUrls: ['./view-delivery-entries.component.scss'],
})
export class ViewDeliveryEntriesComponent implements OnInit {
  storeSelected: string;
  deliverymanSelected: string = 'all';
  dateSelected: Date = new Date();
  entries: Array<any> = [];
  stores: Array<any>;
  deliveryman: Array<any>;
  p = 1;

  constructor(private apiservice: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]._id;
      this.stores = data?.stores;
      this.fetchData();
    });
  }

  filterDeliveryman() {
    let payload = {
      date: this.dateSelected,
      deliveryman: this.deliverymanSelected,
    };
    this.apiservice
      .listDeliveryEntriesbyDate(payload)
      .subscribe((data: any) => {
        this.entries = data?.entry;
      });
  }

  fetchData() {
    let payload = {
      date: this.dateSelected,
      deliveryman: this.deliverymanSelected,
    };

    this.apiservice
      .viewDeliverymanbyStore({ store: this.storeSelected })
      .subscribe((data: any) => {
        this.deliverymanSelected = 'all';
        this.deliveryman = data?.deliveryman;
      });

    this.apiservice
      .listDeliveryEntriesbyDate(payload)
      .subscribe((data: any) => {
        this.entries = data?.entry;
      });
  }
}

