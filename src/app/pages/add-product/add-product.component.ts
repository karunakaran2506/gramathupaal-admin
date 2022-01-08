import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addProduct: FormGroup;
  category = [];
  store = [];
  units = ['millilitre', 'litre', 'gram', 'kilogram']
  imageSrc: any;
  files: any;
  dinein : Boolean;
  takeaway : Boolean;
  delivery : Boolean;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {


    this.addProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      store: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      fileource: new FormControl('')
    })

    this.apiservice.listStores()
     .subscribe((data:any)=>{
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

        this.addProduct.patchValue({
          fileSource: event.target.files
        });
      };
    }
  }

  onStoreChange(value){
    this.apiservice.listCategory({store:value})
      .subscribe((data: any) => {
        this.category = data.category;
      })
  }

  oncancel(){
    this.formGroupDirective.resetForm();
  }

  onSubmit(value) {
    console.log('addProduct', this.addProduct);
    if (this.addProduct.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      const formData = new FormData();
      for (const file of this.files) {
        var extn = file.name.split(".").pop();
        console.log(extn);
        let imagename = this.addProduct.value.name + '.' + extn;
        formData.append("image", file, imagename);
      }

      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("price", value.price);
      formData.append("type", value.type);
      formData.append("category", value.category);
      formData.append("store", value.store);
      formData.append("quantity", value.quantity);
      formData.append("unit", value.unit);

      this.apiservice.addProduct(formData)
        .subscribe((data: any) => {
          console.log(data);
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('/product');
          }
          else {
            this.toastr.error(data.message);
          }
        })
    }
  }

}
