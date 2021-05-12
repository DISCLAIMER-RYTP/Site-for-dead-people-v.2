import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/Service/account.service';
import { AdminService } from 'src/app/Service/admin.service';
import { WareService } from 'src/app/Service/ware.service';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./admin.component.css', './custom.css',
    './jquery.datetimepicker.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: AccountService,
    private shopService: WareService,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private router: Router) { }
    
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  part: string = "dashboard";
  formData: FormData = new FormData();
  LogOut(){
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
}

