import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditDto } from 'src/app/Models/loginDto';
import { AccountService } from 'src/app/Service/account.service';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


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
      if (this.id == null) this.id = localStorage.getItem("Id");
      localStorage.setItem("Id", this.id);
      this.userService.getUser(this.id).subscribe((res: any) => {
        if (res.isSuccessful) {       
          console.log(res);
          this.prop = res.data;
        }
        else {
          this.notifier.notify('error', 'Something goes wrong');
        }
      });
    }
  
    Edit() {
      this.router.navigate(['/account/edit', { id: this.id }]);
    }
  

}
