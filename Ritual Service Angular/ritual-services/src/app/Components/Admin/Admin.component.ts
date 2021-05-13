import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/Models/apiResponse';
import { EmployersDto } from 'src/app/Models/employersDto';
import { EditDto } from 'src/app/Models/loginDto';
import { AccountService } from 'src/app/Service/account.service';
import { AdminService } from 'src/app/Service/admin.service';
import { EmployeesService } from 'src/app/Service/employees.service';
import { WareService } from 'src/app/Service/ware.service';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./admin.component.css', './custom.css',
    './jquery.datetimepicker.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: AccountService,
    private empService: EmployeesService,
    private shopService: WareService,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notifier:NotifierService) { 
      this.userService.loginStatus.subscribe((res)=>{
      this.ngOnInit();
    });  
  }
    
  ngOnInit(): void {
    this.empService.getEmployees().subscribe((res: any) => {
      if (res.isSuccessful) {       
        console.log(res);
        this.prop = res.data;
      }
      else {
        this.notifier.notify('error', 'Something goes wrong');
      }
    });

    this.userService.getUsers().subscribe((res: any) => {
      if (res.isSuccessful) {       
        console.log(res);
        this.user = res.data;
      }
      else {
        this.notifier.notify('error', 'Something goes wrong');
      }
    });

  }
 
  part: string = "dashboard";
  path: string = "";
  formData: FormData = new FormData();
    imgSrc: string = '';

user: Array<EditDto> =[]
prop: Array<EmployersDto> =[];
emp: EmployersDto= {
  id: 0,
  fullName: "",
  phone: "",
  position: "",
  image: "",
  description: ""
}

  AddEmpPath(){
    this.path = "emp"
  }

  AddEmp(){
    this.formData.append('dto', JSON.stringify(this.emp));
      this.empService.addEmployees(this.formData).subscribe((res: any) => {
        if (res.isSuccessful) {       
          console.log(res);
          this.notifier.notify('ok', 'Employer Add');
        }
        else {
          this.notifier.notify('error', 'Something goes wrong');
        }
      });
  }

  deleteEmpPath(){
    this.path = "emp"
  }

  DeeleteEmp(id:number){
      this.empService.deleteEmployees(id).subscribe((res: any) => {
        if (res.isSuccessful) {       
          console.log(res);
          this.notifier.notify('ok', 'Employer Deleted');
        }
        else {
          this.notifier.notify('error', 'Something goes wrong');
        }
      });
  }


  AddWare(){
    this.path = "ware"
  }

  LogOut(){
    this.userService.loginStatus.emit(false);
    this.userService.LogOut();    
    this.router.navigate(['/account/login']); 
  }
  Edit(id: number) {
    this.part = "edit";
  }
  Dashboard() {
    this.part = "dashboard";
    console.log("dashboard");
  }
  Add() {
    this.part = "add";
    console.log("add");
  }
  Delete() {
    this.part = "delete";
    console.log("delete");
  }
  Update() {
    this.part = "update";
  }
  Requests() {
    this.part = "requests";
    console.log("requests");
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

