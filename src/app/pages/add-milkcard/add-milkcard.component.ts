import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-milkcard',
  templateUrl: './add-milkcard.component.html',
  styleUrls: ['./add-milkcard.component.scss']
})
export class AddMilkcardComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addMilkcard: FormGroup;
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

    this.addMilkcard = new FormGroup({
      store: new FormControl(''),
      product: new FormControl(''),
      name: new FormControl(''),
      validity: new FormControl(1),
      price: new FormControl(0)
    })
  }

  changeValue(value:any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.listProduct(data)
      .subscribe((data: any) => {
        this.product = data?.product.filter((x:any) => x.milktype === 'a2milk');;
      })
  }

  changeProduct(value:string){
    const product = this.product?.filter((x:any) => x._id === value);
    this.productSelected = product[0];
    this.setPrice();
  }

  setPrice(){
    this.addMilkcard.patchValue({
      price : this.productSelected?.price * (this.addMilkcard?.value?.validity > 0 ? this.addMilkcard?.value?.validity - 1 : 0)
    })
  }

  onSubmit(value) {
    if (this.addMilkcard.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      this.apiservice.createMilkcard(value)
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
    this.formGroupDirective.reset();
  }
}
