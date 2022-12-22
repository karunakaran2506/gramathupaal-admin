import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-milkentryman',
  templateUrl: './view-milkentryman.component.html',
  styleUrls: ['./view-milkentryman.component.scss']
})
export class ViewMilkentrymanComponent implements OnInit {

  constructor(private apiservice: ApiService, private router : Router) { }

  p = 1;
  storeSelected: string;
  stores: Array<any> = [];
  milkentryman: Array<any> = [];

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data.stores;
        this.changeValue(data?.stores[0]?._id);
      })
  }

  changeValue(value:any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.viewMilkentrymanbyStore(data)
      .subscribe((data: any) => {
        this.milkentryman = data?.milkentryman;
      })
  }

  editUser(value:any){
    this.apiservice.milkentrymanSelected = value;
    this.router.navigateByUrl('/edit-milkentryman');
  }

}
