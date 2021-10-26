import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm: FormGroup;
  files: any;
  imageSrc: any;
  category: any;

  hours = [
    {time: 1, displayname : '01 AM'},
    {time: 2, displayname : '02 AM'},
    {time: 3, displayname : '03 AM'},
    {time: 4, displayname : '04 AM'},
    {time: 5, displayname : '05 AM'},
    {time: 6, displayname : '06 AM'},
    {time: 7, displayname : '07 AM'},
    {time: 8, displayname : '08 AM'},
    {time: 9, displayname : '09 AM'},
    {time: 10, displayname : '10 AM'},
    {time: 11, displayname : '11 AM'},
    {time: 12, displayname : '12 PM'},
    {time: 13, displayname : '01 PM'},
    {time: 14, displayname : '02 PM'},
    {time: 15, displayname : '03 PM'},
    {time: 16, displayname : '04 PM'},
    {time: 17, displayname : '05 PM'},
    {time: 18, displayname : '06 PM'},
    {time: 19, displayname : '07 PM'},
    {time: 20, displayname : '08 PM'},
    {time: 21, displayname : '09 PM'},
    {time: 22, displayname : '10 PM'},
    {time: 23, displayname : '11 PM'},
    {time: 0, displayname : '12 AM'}
  ]
  
  minutes = [
    {time: 0, displayname : '00 Mins'},
    {time: 15, displayname : '15 Mins'},
    {time: 30, displayname : '30 Mins'},
    {time: 45, displayname : '45 Mins'}
  ]

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.category = this.apiservice.category;
    this.imageSrc = this.category.image;

    this.editCategoryForm = new FormGroup({
      name: new FormControl(this.category.name, Validators.required),
      file: new FormControl(''),
      fileSource: new FormControl(''),
      category: new FormControl(this.category._id),
      openingtime1: new FormControl(this.category.openingtime1, Validators.required),
      openingtime2: new FormControl(this.category.openingtime2, Validators.required),
      closingtime1: new FormControl(this.category.closingtime1, Validators.required),
      closingtime2: new FormControl(this.category.closingtime2, Validators.required)
    })
  }

  onFileChange(event) {
    const reader = new FileReader();
    this.files = event.target.files;
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.editCategoryForm.patchValue({
          fileSource: event.target.files
        });

      };

    }
  }

  onSubmit(value) {
    if (this.editCategoryForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {
      const formData = new FormData();
      
      if(this.files){
        for (const file of this.files) {
          var extn = file.name.split(".").pop();
          console.log(extn);
          let imagename = this.editCategoryForm.value.name + '.' + extn;
          formData.append("image", file, imagename);
        }
      }

      formData.append("name", this.editCategoryForm.value.name)
      formData.append("category", this.editCategoryForm.value.category)
      formData.append("openingtime1", this.editCategoryForm.value.openingtime1)
      formData.append("openingtime2", this.editCategoryForm.value.openingtime2)
      formData.append("closingtime1", this.editCategoryForm.value.closingtime1)
      formData.append("closingtime2", this.editCategoryForm.value.closingtime2)

      if(this.files){
        
      }
      else{
      
      }

    }
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

}
