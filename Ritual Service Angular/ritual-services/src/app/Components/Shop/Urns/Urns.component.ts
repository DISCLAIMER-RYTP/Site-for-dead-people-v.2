import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse } from 'src/app/Models/apiResponse';
import { WareDto } from 'src/app/Models/wareDto';
import { WareService } from 'src/app/Service/ware.service';

@Component({
  selector: 'app-Urns',
  templateUrl: './Urns.component.html',
  styleUrls: ['./Urns.component.css']
})
export class UrnsComponent implements OnInit {

  constructor( private wareService:WareService,private notifier:NotifierService) { }

urns!:Array<WareDto>

  ngOnInit() {
    this.loadUrnsCategory();
  }


  loadUrnsCategory(){
    this.wareService.getWareCategory("Urns").subscribe((res:ApiCollectionResponse)=>{
        if(res.isSuccessful){
          console.log(res.data)
          this.notifier.notify('warning', 'Shop works!')
          this.urns=res.data;
          console.log(res.data)
        }
    });
 }


}
