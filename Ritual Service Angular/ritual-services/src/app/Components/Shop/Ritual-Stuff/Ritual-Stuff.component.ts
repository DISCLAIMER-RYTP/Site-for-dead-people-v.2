import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse, ApiResponse } from 'src/app/Models/apiResponse';
import { WareDto } from 'src/app/Models/wareDto';
import { WareService } from 'src/app/Service/ware.service';


@Component({
  selector: 'app-Ritual-Stuff',
  templateUrl: './Ritual-Stuff.component.html',
  styleUrls: ['./Ritual-Stuff.component.css']
})
export class RitualStuffComponent implements OnInit {
  
  stuffs!: Array<WareDto>;




  constructor(private WareSewrvice:WareService,
    private notifier:NotifierService) { }

 
   
  ngOnInit() {
    this.loadStuffsCategory();
  }

  loadStuffsCategory(){
    this.WareSewrvice.getWareCategory("Ritual-Stuff").subscribe((res:ApiCollectionResponse)=>{
        if(res.isSuccessful){
          console.log(res.data)
          this.notifier.notify('warning', 'Shop works!')
          this.stuffs=res.data;
          console.log(res.data)
        }
    });
 }


}
