import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ResultLoginDto } from '../Models/apiResponse';
import { RegisterDto } from 'src/app/Models/registerDto';
import { LoginDto } from 'src/app/Models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  register(user: RegisterDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44339/api/account/Register', user);
  }
  login(user: LoginDto): Observable<ApiResponse> {
    return this.http.post<ResultLoginDto>('https://localhost:44339/api/account/Login', user);
  }
}