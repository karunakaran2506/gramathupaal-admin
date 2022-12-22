import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowheat',
  templateUrl: './view-cowheat.component.html',
  styleUrls: ['./view-cowheat.component.scss']
})
export class ViewCowheatComponent implements OnInit {

  cowheat : Array<any> = [];
  p = 1;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit(){
    this.cowheat = this.apiservice?.cowSelected?.cowheat;
  }

}
