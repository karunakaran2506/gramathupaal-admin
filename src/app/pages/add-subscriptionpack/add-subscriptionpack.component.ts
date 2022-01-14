import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-subscriptionpack',
  templateUrl: './add-subscriptionpack.component.html',
  styleUrls: ['./add-subscriptionpack.component.scss']
})
export class AddSubscriptionpackComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addSubscriptionpack: FormGroup;
  storeSelected: string;
  productSelected: any;
  product: Array<any>;
  stores: Array<any>;

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

    this.addSubscriptionpack = new FormGroup({
      store: new FormControl(''),
      product: new FormControl(''),
      name: new FormControl(''),
      validity: new FormControl(1),
      price: new FormControl(0)
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
    const validity = this.addSubscriptionpack?.value?.validity;
    this.addSubscriptionpack.patchValue({
      price: this.productSelected?.price * (validity > 30 ? validity - 1 : validity)
    })
  }

  onSubmit(value) {
    if (this.addSubscriptionpack.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      this.apiservice.createSubscriptionpack(value)
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
    this.formGroupDirective.resetForm();
  }
}
