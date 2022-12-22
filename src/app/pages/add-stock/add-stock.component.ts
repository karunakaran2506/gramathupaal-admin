import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addStock: FormGroup;
  storeSelected: string;
  productData: Array<any>;
  allProduct: Array<any>;
  stores: Array<any>;
  entryDate = new Date();

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addStock = new FormGroup({
      product: new FormControl(),
      store: new FormControl(),
      type: new FormControl('milk'),
      stocktype: new FormControl('in'),
      quantity: new FormControl(),
      entryDate: new FormControl(this.entryDate),
    });

    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data?.stores;
      this.changeValue(this.storeSelected);
    });
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let payload = {
      store: this.storeSelected,
    };
    this.apiservice.listProduct(payload).subscribe((data: any) => {
      this.allProduct = data.product;
      this.productData = data.product.filter((x: any) => x.type === 'milk');
    });
  }

  changeCategory(value: any) {
    this.productData = this.allProduct.filter((x: any) => x.type === value);
  }

  onSubmit(value: any) {
    if (this.addStock.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    } else {
      let data = {
        ...value,
        product: value?.product,
        producttype: value?.type,
        entryDate: this.entryDate,
        store: this.storeSelected,
      };

      this.apiservice.saveStockEntry(data).subscribe((data: any) => {
        if (data.success) {
          this.toastr.success(data.message);
          this.router.navigateByUrl('/view-stock');
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }

  oncancel() {
    this.formGroupDirective.reset();
  }
}
