import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/Models/apiResponse';
import { RegisterDto } from 'src/app/Models/registerDto';
import { AccountService } from 'src/app/Service/account.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
 
})
export class RegisterComponent implements OnInit {

   

  constructor(private accountService: AccountService, private router: Router) { }

  register: RegisterDto = {
    id: -1,
    fullName: '',
    email: '',
    password: '',
    image: '',
    age: 0,
    phoneNumber: ''
  }

  formData: FormData = new FormData();
  DogIdAddPhoto: number = 0;
  part: string = 'edit';
  imgSrc: string = '';

  ngOnInit() {
  }


  onRegister()
  {
    this.formData.append('dto', JSON.stringify(this.register));
    this.accountService.register(this.formData).subscribe((res: ApiResponse) =>{
      if(res.isSuccessful){
        console.log(res.message)
        this.router.navigate(['/']);
      }
    })
  }

  uploadPhoto(e: any) {
    if (e.target!= null) {
      if (e.target.files && e.target.files.item(0)) {
        this.formData.append('file', e.target.files.item(0) as File);
        console.log(e.target.files);
        this.imgSrc = URL.createObjectURL(e.target.files[0]);
      }
      // this.userService.UploadPhoto(this.EditDog.id.toString(), this.formData).subscribe((res: ApiResponse) => {
      //   if (res.isSuccessful) {

      //   }
      // });
    }
  }


 

}
