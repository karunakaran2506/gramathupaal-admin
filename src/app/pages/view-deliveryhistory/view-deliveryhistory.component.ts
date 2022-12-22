import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-deliveryhistory',
  templateUrl: './view-deliveryhistory.component.html',
  styleUrls: ['./view-deliveryhistory.component.scss'],
})
export class ViewDeliveryhistoryComponent implements OnInit {
  subscriptionpackorder: string;
  deliveredDays: number = 0;
  notdeliveredDays: number = 0;
  entries: Array<any>;

  constructor(
    private apiservice: ApiService,
    public dialogRef: MatDialogRef<ViewDeliveryhistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.subscriptionpackorder = this.data?._id;

    this.apiservice
      .viewDeliveryHistory({
        subscriptionpackorder: this.subscriptionpackorder,
      })
      .subscribe((data: any) => {
        this.entries = data?.entry;
        data?.entry?.map((entry) => {
          if (entry.isdelivered) {
            this.deliveredDays++;
          } else {
            this.notdeliveredDays++;
          }
        });
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
