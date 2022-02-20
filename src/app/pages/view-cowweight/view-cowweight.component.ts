import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowweight',
  templateUrl: './view-cowweight.component.html',
  styleUrls: ['./view-cowweight.component.scss']
})
export class ViewCowweightComponent implements OnInit {

  cowweight : Array<any> = [];
  p = 1;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit(){
    console.log(this.apiservice?.cowSelected);
    this.cowweight = this.apiservice?.cowSelected?.cowweight;
  }

}
