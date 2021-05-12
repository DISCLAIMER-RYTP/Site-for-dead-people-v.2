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
        const jwtData = res.token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        if (decodedJwtData.roles == "User") {
        localStorage.setItem("id",res.message)
        localStorage.setItem("token",res.token)
        this.accountService.loginStatus.emit(true);
        this.notifier.notify('success', ' Ok');
        this.router.navigate(['/account', {id: res.message}]); 
        }
        else if (decodedJwtData.roles == "Admin") {
          localStorage.setItem("id",res.message)
          localStorage.setItem("token",res.token)
          this.accountService.loginStatus.emit(true);
          this.notifier.notify('success', ' Ok');
          this.router.navigate(['/admin']); 
          }
      }
      else{
        this.notifier.notify('error', 'Error login or password');
      }
    })
  }

}
