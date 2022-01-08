import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addUserForm: FormGroup;
  storeSelected: any;
  files: any;
  store = [];
  imageSrc: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.addUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      adhar: new FormControl('', Validators.required),
      store: new FormControl('', Validators.required),
      role: new FormControl('Storeclerk', Validators.required),
      file: new FormControl(''),
      fileource: new FormControl('')
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data.stores[0]._id;
        this.store = data.stores;
      })
  }

  onFileChange(event) {
    const reader = new FileReader();
    this.files = event.target.files;
    console.log(this.files);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.addUserForm.patchValue({
          fileSource: event.target.files
        });
      };
    }
  }

  onSubmit(value) {
    if (this.addUserForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      if (this.files?.length) {
        const formData = new FormData();
        for (const file of this.files) {
          var extn = file.name.split(".").pop();
          console.log(extn);
          let imagename = this.addUserForm.value.name + '.' + extn;
          formData.append("image", file, imagename);
        }

        formData.append("name", value.name);
        formData.append("phone", value.phone);
        formData.append("email", value.email);
        formData.append("password", value.password);
        formData.append("adhar", value.adhar);
        formData.append("store", value.store);
        formData.append("role", value.role);

        this.apiservice.userSignupWithImage(formData)
          .subscribe((data: any) => {
            if (data.success) {
              this.successToast(data.message);
              this.router.navigateByUrl('view-user')
            }
            else {
              this.errorToast(data.message);
            }
          })
      } else {
        this.apiservice.userSignup(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('view-user')
          }
          else {
            this.errorToast(data.message);
          }
        })
      }
    }
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

}