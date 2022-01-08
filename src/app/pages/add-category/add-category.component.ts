import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addCategoryForm: FormGroup;
  files: any;
  store = [];
  imageSrc: any;

  constructor(
    private apiservice: ApiService,
    private toastr : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {

    this.addCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      store: new FormControl('', Validators.required),
    })

    this.apiservice.listStores()
     .subscribe((data:any)=>{
       this.store = data.stores;
     })
  }

  onSubmit(value) {
    if (this.addCategoryForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {
      let data = {
        name : value.name,
        store : value.store,
      }

      this.apiservice.addcategory(data)
        .subscribe((data: any) => {
          console.log(data);
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('category')
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
