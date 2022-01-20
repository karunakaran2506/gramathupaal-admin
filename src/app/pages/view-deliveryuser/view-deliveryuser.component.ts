import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-deliveryuser',
  templateUrl: './view-deliveryuser.component.html',
  styleUrls: ['./view-deliveryuser.component.scss']
})
export class ViewDeliveryuserComponent implements OnInit {

  constructor(private apiservice: ApiService, private router : Router) { }

  p = 1;
  storeSelected: string;
  stores: Array<any> = [];
  deliveryman: Array<any> = [];

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
    this.apiservice.viewDeliverymanbyStore(data)
      .subscribe((data: any) => {
        this.deliveryman = data?.deliveryman;
      })
  }

  editUser(value:any){
    this.apiservice.deliveryuserSelected = value;
    this.router.navigateByUrl('/edit-deliveryman');
  }

}
