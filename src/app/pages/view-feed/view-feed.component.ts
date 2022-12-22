import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.scss'],
})
export class ViewFeedComponent implements OnInit {
  storeSelected: string;
  feeds: Array<any>;
  stores: Array<any>;
  p = 1;

  constructor(private apiservice: ApiService) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.stores = data.stores;
      this.storeSelected = data.stores[0]._id;
      this.fetchData();
    });
  }

  fetchData() {
    let data = {
      store: this.storeSelected,
    };
    this.apiservice.listFeed(data).subscribe((data: any) => {
      this.feeds = data.feed;
    });
  }
}
