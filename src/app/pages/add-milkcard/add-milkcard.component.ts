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
  product: Array<any>;
  stores: Array<any>;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.addMilkcard = new FormGroup({
      product: new FormControl({}),
      name: new FormControl(),
      validity: new FormControl(),
      price: new FormControl()
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
        this.product = data?.product.filter((x:any) => x.milktype === 'a2milk');;
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
