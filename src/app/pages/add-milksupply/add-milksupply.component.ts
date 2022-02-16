import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-milksupply',
  templateUrl: './add-milksupply.component.html',
  styleUrls: ['./add-milksupply.component.scss']
})
export class AddMilksupplyComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addMilksupplyentry: FormGroup;
  storeSelected: string;
  deliveryman: Array<any>;
  stores: Array<any>;
  product: Array<any>;

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

    this.addMilksupplyentry = new FormGroup({
      store: new FormControl(''),
      product: new FormControl(''),
      quantity: new FormControl(),
      deliveryman: new FormControl('')
    })
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.listProduct(data)
      .subscribe((data: any) => {
        this.product = data?.product.filter((x: any) => x.type === 'milk' && (x.unit === 'litre' && x.quantity === 1));;
      })

      this.apiservice.viewDeliverymanbyStore(data)
      .subscribe((data: any) => {
        this.deliveryman = data?.deliveryman;
      })
  }

  onSubmit(value: any) {
    if (this.addMilksupplyentry.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      let payload = {
        store : value?.store,
        quantity : value?.quantity,
        product : value?.product,
        deliveryman : value?.deliveryman
      }

      this.apiservice.milkSupplyEntry(payload)
        .subscribe((data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('/today-milksupply');
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
