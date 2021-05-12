import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/Models/apiResponse';
import { EditDto } from 'src/app/Models/loginDto';
import { AccountService } from 'src/app/Service/account.service';

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

    formData: FormData = new FormData();
    part: string = 'edit';
    imgSrc: string = '';

    prop: EditDto = {
      id: "-1",
      fullName: 'a',
      age: 1,
      phone: 'a',
      email:'a',
      image: 'Image'
    };
  
    id: any;
    path:string='https://localhost:44339/Images/';

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

    uploadPhoto(e: any) {
      if (e.target!= null) {
        if (e.target.files && e.target.files.item(0)) {
          this.formData.append('file', e.target.files.item(0) as File);
          console.log(e.target.files);
          this.imgSrc = URL.createObjectURL(e.target.files[0]);
        }
        this.userService.UploadPhoto(this.prop.id, this.formData).subscribe((res: ApiResponse) => {
          if (res.isSuccessful) {
  
          }
        });
      }
    }
}
