import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/Models/apiResponse';
import { RegisterDto } from 'src/app/Models/registerDto';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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

  ngOnInit() {
  }

  onRegister()
  {
    this.accountService.register(this.register).subscribe((res: ApiResponse) =>{
      if(res.isSuccessful){
        console.log(res.message)
        this.router.navigate(['/']);
      }
    })
  }

}
