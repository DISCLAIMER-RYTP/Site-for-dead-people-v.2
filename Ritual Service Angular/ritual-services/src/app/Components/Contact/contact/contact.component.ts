import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployersDto } from 'src/app/Models/employersDto';
import { EmployeesService } from 'src/app/Service/employees.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private empService: EmployeesService,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService,
    private router: Router,
    private route: ActivatedRoute) { }

    prop: Array<EmployersDto> = [];

    id: any;
    path:string='https://localhost:44339/Images/';

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id == null) this.id = localStorage.getItem("Id");
      localStorage.setItem("Id", this.id);
      this.empService.getEmployees().subscribe((res: any) => {
        if (res.isSuccessful) {       
          console.log(res);
          this.prop = res.data;
        }
        else {
          this.notifier.notify('error', 'Something goes wrong');
        }
      });
    }

}
