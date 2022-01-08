import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-milkcard',
  templateUrl: './view-milkcard.component.html',
  styleUrls: ['./view-milkcard.component.scss']
})
export class ViewMilkcardComponent implements OnInit {

  milkcard : any;
  p=1;

  constructor(private apiservice : ApiService) { }

  ngOnInit(){
    this.apiservice.listMilkcard()
     .subscribe((data:any)=>{
       this.milkcard = data.milkcard;
     })
  }

}
