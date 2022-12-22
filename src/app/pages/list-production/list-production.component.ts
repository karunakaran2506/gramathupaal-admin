import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-list-production',
  templateUrl: './list-production.component.html',
  styleUrls: ['./list-production.component.scss'],
})
export class ListProductionComponent implements OnInit {
  storeSelected: string;
  dateSelected: Date = new Date();
  production: Array<any>;
  stores: Array<any>;
  p = 1;
  term: string;

  constructor(private apiservice: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.stores = data.stores;
      this.storeSelected = data.stores[0]._id;
      this.fetchData();
    });
  }

  fetchData() {
    let payload = {
      store: this.storeSelected,
      date: this.dateSelected
    };
    this.apiservice.listProduction(payload).subscribe((result: any) => {
      this.production = result.production;
    });
  }

  editProduction(data: any) {
    this.apiservice.productionSelected = data;
    this.router.navigateByUrl('/edit-production');
  }
}
