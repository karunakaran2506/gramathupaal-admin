import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-subscriptionpack',
  templateUrl: './edit-subscriptionpack.component.html',
  styleUrls: ['./edit-subscriptionpack.component.scss']
})
export class EditSubscriptionpackComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editSubscriptionpack: FormGroup;
  storeSelected: string;
  productSelected: any;
  product: Array<any>;
  stores: Array<any>;
  pack: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data?.stores;
        this.changeValue(this.storeSelected);
      })

      this.pack = this.apiservice.packSelected;

    this.editSubscriptionpack = new FormGroup({
      subscriptionpack: new FormControl(this.pack._id, Validators.required),
      store: new FormControl(this.pack?.store, Validators.required),
      product: new FormControl(this.pack?.product?._id, Validators.required),
      name: new FormControl(this.pack?.name, Validators.required),
      validity: new FormControl(this.pack?.validity),
      price: new FormControl(this.pack?.price)
    })
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.listProduct(data)
      .subscribe((data: any) => {
        this.product = data?.product.filter((x: any) => x.type === 'milk');;
      })
  }

  changeProduct(value: string) {
    const product = this.product?.filter((x: any) => x._id === value);
    this.productSelected = product[0];
    this.setPrice();
  }

  setPrice() {
    const validity = this.editSubscriptionpack?.value?.validity;
    this.editSubscriptionpack.patchValue({
      price: this.productSelected?.price * (validity > 30 ? validity - 1 : validity)
    })
  }

  onSubmit(value) {
    if (this.editSubscriptionpack.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      this.apiservice.editSubscriptionpack(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('/view-subscriptionpack');
          }
          else {
            this.toastr.error(data.message);
          }
        })
    }
  }

  oncancel() {
    this.router.navigateByUrl('/view-subscriptionpack');
  }
}
