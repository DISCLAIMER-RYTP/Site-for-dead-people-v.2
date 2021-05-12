import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse } from 'src/app/Models/apiResponse';
import { WareDto } from 'src/app/Models/wareDto';
import { WareService } from 'src/app/Service/ware.service';

@Component({
  selector: 'app-Memorial',
  templateUrl: './Memorial.component.html',
  styleUrls: ['./Memorial.component.css']
})
export class MemorialComponent implements OnInit {

  constructor(private wareService:WareService,
    private notifier:NotifierService) { }

  memorials!:Array<WareDto>

  ngOnInit() {
    this.loadMemorialCategory();
  }

  loadMemorialCategory(){
    this.wareService.getWareCategory("Memorial").subscribe((res:ApiCollectionResponse)=>{
        if(res.isSuccessful){
          console.log(res.data)
          this.notifier.notify('warning', 'Shop works!')
          this.memorials=res.data;
          console.log(res.data)
        }
    });
 }

}
