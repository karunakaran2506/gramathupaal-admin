import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  storeSelected : string;
  product : Array<any>;
  stores : Array<any>;
  p=1;

  constructor(
    private apiservice : ApiService
  ) { }

  ngOnInit(){

    this.apiservice.listStores()
     .subscribe((data:any)=>{
       console.log('data', data);
       this.stores = data.stores;
     })
  }

  changeValue(value){
    this.storeSelected = value; 
    let data = {
      store : this.storeSelected
    }
    this.apiservice.listProduct(data)
     .subscribe((data:any)=>{
       console.log('data', data);
       this.product = data.product;
     })
  }

}
