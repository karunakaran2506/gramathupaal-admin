import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  product: any;
  editProduct: FormGroup;
  category = [];
  store = [];
  units = ['millilitre', 'litre', 'gram', 'kilogram'];
  imageSrc: any;
  files: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.product = this.apiservice.productSelected;

    console.log('product', this.product);

    this.editProduct = new FormGroup({
      name: new FormControl(this.product?.name, Validators.required),
      milktype: new FormControl(this.product?.milktype),
      type: new FormControl(this.product?.type, Validators.required),
      price: new FormControl(this.product?.price, Validators.required),
      category: new FormControl(this.product?.category?._id, Validators.required),
      store: new FormControl(this.product?.store, Validators.required),
      quantity: new FormControl(this.product?.quantity, Validators.required),
      unit: new FormControl(this.product?.unit, Validators.required),
      product: new FormControl(this.product?._id),
      file: new FormControl(''),
      fileource: new FormControl('')
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.store = data.stores;
        this.onStoreChange(this.product?.store);
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

        this.editProduct.patchValue({
          fileSource: event.target.files
        });
      };
    }
  }

  onStoreChange(value) {
    this.apiservice.listCategory({ store: value })
      .subscribe((data: any) => {
        this.category = data.category;
      })
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }

  onSubmit(value) {
    console.log('addProduct', this.editProduct);
    if (this.editProduct.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      const formData = new FormData();

      if (this.files?.length) {
        for (const file of this.files) {
          var extn = file.name.split(".").pop();
          console.log(extn);
          let imagename = this.editProduct.value.name + '.' + extn;
          formData.append("image", file, imagename);
        }
      }

      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("price", value.price);
      formData.append("type", value.type);
      formData.append("category", value.category);
      formData.append("store", value.store);
      formData.append("quantity", value.quantity);
      formData.append("unit", value.unit);
      formData.append("product", value.product);
      formData.append("milktype", value.milktype);

      if (this.files?.length) {
        this.apiservice.editProduct(formData)
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
      } else {
        this.apiservice.editProductwithoutImage(formData)
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

}