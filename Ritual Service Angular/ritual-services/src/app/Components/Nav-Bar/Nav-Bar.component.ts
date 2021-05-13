import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-Nav-Bar',
  templateUrl: './Nav-Bar.component.html',
  styleUrls: ['./Nav-Bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  IsLoggedIn: boolean;
  IsAdmin: boolean;
  
  email:string='';
  
  constructor(private userService: AccountService, private router: Router) {   
    this.userService.loginStatus.subscribe((res)=>{
      this.ngOnInit();
    }); 
    this.IsLoggedIn = false; 
    this.IsAdmin = false;
  }
  ngOnInit() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.IsAdmin = this.userService.isAdmin();
      this.userService.getUser(id).subscribe((res: any) => {
        if (res.isSuccessful) {
          this.userService.loginStatus.emit(true);
          this.email = res.data.email
          this.IsLoggedIn = true
        }        
      });
    }
  }

  LogOut(){
    this.userService.loginStatus.emit(false);
    this.userService.LogOut();    
    this.router.navigate(['/account/login']); 
  }
}
