import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view-milkcard',
  templateUrl: './view-milkcard.component.html',
  styleUrls: ['./view-milkcard.component.scss']
})
export class ViewMilkcardComponent implements OnInit {

  milkcard : any;
  p=1;

  constructor(private apiservice : ApiService, private router: Router, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(){
    this.apiservice.listMilkcard()
     .subscribe((data:any)=>{
       this.milkcard = data.milkcard;
     })
  }

  editMilkcard(data:any){
    this.apiservice.milkcardSelected = data;
    this.router.navigateByUrl('/edit-milkcard')
  }

  deleteMilkcard(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      width: '70%',
      data: "Are you sure to delete the milkcard?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = {
          id
        };
        this.apiservice.deleteMilkcard(data)
          .subscribe((data: any) => {
            if (data?.success) {
              this.toastr.success(data?.message);
              this.ngOnInit();
            } else {
              this.toastr.error(data?.message);
            }
          })
      }
    });
  }

}
