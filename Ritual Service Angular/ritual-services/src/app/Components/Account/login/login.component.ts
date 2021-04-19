import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultLoginDto } from 'src/app/Models/apiResponse';
import { LoginDto } from 'src/app/Models/loginDto';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  login: LoginDto = {
    id: -1,
    email: '',
    password: '',
  }

  ngOnInit() {
  }

  onLogin()
  {
    this.accountService.login(this.login).subscribe((res: any) =>{
      if(res.isSuccessful){
        console.log(res.message)
        this.router.navigate(['/account']);
        localStorage.setItem("token",res.token)
      }
    })
  }
}
