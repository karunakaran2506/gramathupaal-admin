import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowtreatment',
  templateUrl: './view-cowtreatment.component.html',
  styleUrls: ['./view-cowtreatment.component.scss']
})
export class ViewCowtreatmentComponent implements OnInit {

  storeSelected: string;
  cowTreatment: Array<any>;
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
    this.apiservice.viewCowTreatment(data)
      .subscribe((data: any) => {
        this.cowTreatment = data?.data;
      })
  }

}
