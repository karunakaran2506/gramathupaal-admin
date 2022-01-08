import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addStock: FormGroup;
  storeSelected: string;
  product: Array<any>;
  allProduct: Array<any>;
  stores: Array<any>;
  entryDate = new Date();

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.addStock = new FormGroup({
      product: new FormControl({}),
      store: new FormControl(),
      type: new FormControl(),
      quantity: new FormControl(),
      entryDate: new FormControl(this.entryDate),
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data?.stores;
      })
  }

  changeValue(value) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.listProduct(data)
      .subscribe((data: any) => {
        this.product = data.product;
        this.allProduct = data.product;
      })
  }

  changeCategory(value) {
    if (value === 'milk' || value === 'others') {
      this.product = this.allProduct.filter((x: any) => x.type === value);
    } else {
      this.product = this.allProduct;
    }
  }

  onSubmit(value) {
    console.log('value', value);
    if (this.addStock.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {
      const product = value?.product?.split(",");
      let data = {
        ...value,
        product : product[0],
        producttype : product[1],
        entryDate: this.entryDate,
        store: this.storeSelected
      };

      console.log('data', data);

      this.apiservice.saveStockEntry(data)
        .subscribe((data: any) => {
          console.log('data');
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('/view-stock');
          }
          else {
            this.toastr.error(data.message);
          }
        })
    }
  }

  oncancel() {
    this.formGroupDirective.reset();
  }
}