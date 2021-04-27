import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiResponse } from 'src/app/Models/apiResponse';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  loading = false;
  avatarUrl?: string;
  form: FormData = new FormData();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
}
