import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.component.html',
  styleUrls: ['./add-cost.component.scss']
})
export class AddCostComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  costMgtForm: FormGroup;
  storeSelected : any;
  store = [];
  selectedDate : Date;

  constructor(
    private apiservice: ApiService,
    private toastr : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {

    this.selectedDate = new Date();

    this.costMgtForm = new FormGroup({
      date : new FormControl(this.selectedDate),
      type : new FormControl('expenses', Validators.required),
      amount : new FormControl('', Validators.required),
      comment : new FormControl(''),
      store : new FormControl(this.storeSelected),
    })

    this.apiservice.listStores()
     .subscribe((data:any)=>{
       this.storeSelected = data?.stores[0]._id
       this.store = data.stores;
     })
  }

  onSubmit(value) {
    if (this.costMgtForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.saveCostEntry(value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('cost')
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel(){
    this.formGroupDirective.resetForm();
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

}
