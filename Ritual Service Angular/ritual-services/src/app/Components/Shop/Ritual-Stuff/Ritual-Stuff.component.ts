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

  //category:string =localStorage.getItem("category"); 


  constructor(private WareSewrvice:WareService,
    private notifier:NotifierService) { }

 
   
  ngOnInit() {
   // this.loadStuffsCategory();
  }

  //loadStuffsCategory(){
    //this.WareSewrvice.getWareCategory(this.category).subscribe((res:any)=>{
    //     if(res.isSuccessful){
     //      console.log(res.data)
    //       this.notifier.notify('success', 'OK')
     //      this.stuffs=res.data;
      //     console.log(res.data)
     //    }
    //});
 // }

}
