import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowmilkentry',
  templateUrl: './view-cowmilkentry.component.html',
  styleUrls: ['./view-cowmilkentry.component.scss']
})
export class ViewCowmilkentryComponent implements OnInit {

  cowmilk : Array<any> = [];
  p = 1;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit(){
    console.log(this.apiservice?.cowSelected);
    this.cowmilk = this.apiservice?.cowSelected?.cowmilk;
  }

}
