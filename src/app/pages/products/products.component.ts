import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  storeSelected: string;
  product: Array<any>;
  stores: Array<any>;
  p = 1;
  term: any;

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data.stores;
      this.changeValue();
    });
  }

  changeValue() {
    let data = {
      store: this.storeSelected,
    };
    this.apiservice.listProduct(data).subscribe((data: any) => {
      this.product = data.product;
    });
  }

  editProduct(value) {
    console.log('valye', value);
    this.apiservice.productSelected = value;
    this.router.navigateByUrl('edit-product');
  }

  deleteProduct(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      width: '70%',
      data: 'Are you sure to delete the product?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          id,
        };
        this.apiservice.deleteProduct(data).subscribe((data: any) => {
          if (data?.success) {
            this.toastr.success(data?.message);
            this.changeValue();
          } else {
            this.toastr.error(data?.message);
          }
        });
      }
    });
  }
}
