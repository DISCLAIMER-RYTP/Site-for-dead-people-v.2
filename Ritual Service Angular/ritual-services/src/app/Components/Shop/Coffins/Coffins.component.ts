import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse } from 'src/app/Models/apiResponse';
import { WareDto } from 'src/app/Models/wareDto';
import { WareService } from 'src/app/Service/ware.service';

@Component({
  selector: 'app-Coffins',
  templateUrl: './Coffins.component.html',
  styleUrls: ['./Coffins.component.css']
})
export class CoffinsComponent implements OnInit {

  constructor(private wareService:WareService,private notifier :NotifierService) { }
coffins!:Array<WareDto>

  ngOnInit() {
    this.loadCoffinsCategory();
  }

  loadCoffinsCategory(){
    this.wareService.getWareCategory("Coffins").subscribe((res:ApiCollectionResponse)=>{
        if(res.isSuccessful){
          console.log(res.data)
          this.notifier.notify('warning', 'Shop works!')
          this.coffins=res.data;
          console.log(res.data)
        }
    });
 }

}
