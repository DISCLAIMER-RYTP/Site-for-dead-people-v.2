import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse } from 'src/app/Models/apiResponse';
import { WareDto } from 'src/app/Models/wareDto';
import { WareService } from 'src/app/Service/ware.service';

@Component({
  selector: 'app-Wreaths',
  templateUrl: './Wreaths.component.html',
  styleUrls: ['./Wreaths.component.css']
})
export class WreathsComponent implements OnInit {

  constructor(private wareService:WareService,private notifier :NotifierService) { }

  wreaths!:Array<WareDto>

  ngOnInit() {
    this.loadWreathsCategory();
  }

  loadWreathsCategory(){
    this.wareService.getWareCategory("Wreaths").subscribe((res:ApiCollectionResponse)=>{
        if(res.isSuccessful){
          console.log(res.data)
          this.notifier.notify('warning', 'Shop works!')
          this.wreaths=res.data;
          console.log(res.data)
        }
    });
 }

}
