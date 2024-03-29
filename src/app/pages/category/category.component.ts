import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  storeSelected: string;
  category: Array<any>;
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
    this.apiservice.listCategory(data)
      .subscribe((data: any) => {
        this.category = data.category;
      })
  }

}
