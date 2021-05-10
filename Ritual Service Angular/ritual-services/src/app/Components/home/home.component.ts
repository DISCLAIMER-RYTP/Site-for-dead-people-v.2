import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
  `]
})
export class HomeComponent implements OnInit {
  
  closeResult: string | undefined;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  openScrollableContent(content: any) {
    this.modalService.open(content,{ windowClass: 'dark-modal', scrollable: true, size: 'lg' });
  }

}
