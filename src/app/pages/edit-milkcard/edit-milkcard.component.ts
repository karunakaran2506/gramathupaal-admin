import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-milkcard',
  templateUrl: './edit-milkcard.component.html',
  styleUrls: ['./edit-milkcard.component.scss']
})
export class EditMilkcardComponent implements OnInit {

  editMilkcard: FormGroup;
  storeSelected: string;
  productSelected: any;
  product: Array<any>;
  stores: Array<any>;
  milkcard: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.milkcard = this.apiservice?.milkcardSelected;

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = this.milkcard?.product?.store;
        this.stores = data?.stores;
        this.changeValue(this.storeSelected);
      })

    this.editMilkcard = new FormGroup({
      id: new FormControl(this.milkcard?._id, Validators.required),
      store: new FormControl(this.milkcard?.product?.store, Validators.required),
      product: new FormControl(this.milkcard?.product?._id, Validators.required),
      name: new FormControl(this.milkcard?.name, Validators.required),
      validity: new FormControl(this.milkcard?.validity, Validators.required),
      price: new FormControl(this.milkcard?.price, Validators.required)
    })
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.listProduct(data)
      .subscribe((data: any) => {
        this.product = data?.product.filter((x: any) => x.milktype === 'a2milk');;
      })
  }

  changeProduct(value: string) {
    const product = this.product?.filter((x: any) => x._id === value);
    this.productSelected = product[0];
    this.setPrice();
  }

  setPrice() {
    const validity = this.editMilkcard?.value?.validity;
    this.editMilkcard.patchValue({
      price: this.productSelected?.price * (validity > 30 ? validity - 1 : validity)
    })
  }

  onSubmit(value:any) {
    if (this.editMilkcard.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      this.apiservice.editMilkcard(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('/view-milkcard');
          }
          else {
            this.toastr.error(data.message);
          }
        })
    }
  }

  oncancel() {
    this.router.navigateByUrl('/view-milkcard');
  }
}