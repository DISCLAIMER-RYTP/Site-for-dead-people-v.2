import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResultLoginDto } from 'src/app/Models/apiResponse';
import { LoginDto } from 'src/app/Models/loginDto';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService,) { }

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
      console.log(res)
      if(res.isSuccessful){
        console.log(res)
        localStorage.setItem("token",res.token)
        this.router.navigate(['/account', {id: res.message}]); 
      }
      else{
        this.notifier.notify('error', 'Error login or password');
      }
    })
  }

}
