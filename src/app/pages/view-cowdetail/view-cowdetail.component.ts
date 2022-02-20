import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowdetail',
  templateUrl: './view-cowdetail.component.html',
  styleUrls: ['./view-cowdetail.component.scss']
})
export class ViewCowdetailComponent implements OnInit {

  cow : any;
  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.cow = this.apiservice.cowSelected
  }

}
