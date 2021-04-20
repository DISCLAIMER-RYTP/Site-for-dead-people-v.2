import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/Models/apiResponse';
import { EditDto } from 'src/app/Models/loginDto';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  constructor(private userService: AccountService,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService,
    private router: Router,
    private route: ActivatedRoute) { }

    prop: EditDto = {
      id: "-1",
      fullName: 'a',
      age: 1,
      phoneNumber: 'a',
      email:'a',
      image: 'Image'
    };
  
    id: any;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.userService.getUser(this.id).subscribe((res:any) => {
      if(res.isSuccessful){
        this.prop = res.data
      }
    });
  }

  Edit(){
    this.userService.editUser(this.prop).subscribe((res:ApiResponse) => {
      if(res.isSuccessful){
        this.notifier.notify('success', 'Profile was updated');      
        this.Back();
      }
    });
  }

  Back(){
    this.router.navigate(['/account', {id: this.id}]);      
  }
}
