import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editUserForm: FormGroup;
  storeSelected: any;
  files: any;
  store = [];
  imageSrc: any;
  user : any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.user = this.apiservice.userSelected;

    this.editUserForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      phone: new FormControl(this.user.phone, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      password: new FormControl(''),
      adhar: new FormControl(this.user.adhar, Validators.required),
      store: new FormControl(this.user.store, Validators.required),
      role: new FormControl('Storeclerk', Validators.required),
      user: new FormControl(this.user._id, Validators.required),
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

        this.editUserForm.patchValue({
          fileSource: event.target.files
        });
      };
    }
  }

  onSubmit(value) {
    if (this.editUserForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      if (this.files?.length) {
        const formData = new FormData();
        for (const file of this.files) {
          var extn = file.name.split(".").pop();
          console.log(extn);
          let imagename = this.editUserForm.value.name + '.' + extn;
          formData.append("image", file, imagename);
        }

        formData.append("name", value.name);
        formData.append("email", value.email);
        formData.append("password", value.password);
        formData.append("adhar", value.adhar);
        formData.append("store", value.store);
        formData.append("user", value.user);

        this.apiservice.editUser(formData)
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
        this.apiservice.editUserWithoutImage(value)
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

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

  oncancel(){
    this.router.navigateByUrl('/view-user')
  }

}
