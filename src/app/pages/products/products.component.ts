import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private apiservice : ApiService,
    private router : Router
  ) { }

  ngOnInit(){

    this.apiservice.listStores()
     .subscribe((data:any)=>{
       console.log('data', data);
       this.storeSelected = data?.stores[0]?._id;
       this.stores = data.stores;
       this.changeValue(this.storeSelected);
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

  editProduct(value){
    console.log('valye', value);
    this.apiservice.productSelected = value;
    this.router.navigateByUrl('edit-product');
  }

}
