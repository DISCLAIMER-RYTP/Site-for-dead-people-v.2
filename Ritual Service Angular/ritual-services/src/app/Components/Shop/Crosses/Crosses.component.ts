import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse } from 'src/app/Models/apiResponse';
import { WareDto } from 'src/app/Models/wareDto';
import { WareService } from 'src/app/Service/ware.service';

@Component({
  selector: 'app-Crosses',
  templateUrl: './Crosses.component.html',
  styleUrls: ['./Crosses.component.css']
})
export class CrossesComponent implements OnInit {

  constructor(private wareService:WareService,private notifier:NotifierService) { }

  crosses!:Array<WareDto>
  ngOnInit() {
    this.loadCrosseCategory();
  }

  loadCrosseCategory(){
    this.wareService.getWareCategory("Crosses").subscribe((res:ApiCollectionResponse)=>{
        if(res.isSuccessful){
          console.log(res.data)
          this.notifier.notify('warning', 'Shop works!')
          this.crosses=res.data;
          console.log(res.data)
        }
    });
 }

}
