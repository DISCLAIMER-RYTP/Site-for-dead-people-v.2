import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ApiSingleResponse, ResultLoginDto } from '../Models/apiResponse';
import { RegisterDto } from 'src/app/Models/registerDto';
import { EditDto, LoginDto } from 'src/app/Models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  register(user: RegisterDto): Observable<ApiResponse> {
    console.log(user);
    return this.http.post<ApiResponse>('https://localhost:44339/api/account/register', user);
  }
  login(user: LoginDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44339/api/account/login', user);
  }
  
  getUser(id: string):  Observable<ApiResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44339/api/account/Profile?id=' + id);
  }

  editUser(x: EditDto):  Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44339/api/account/edit', x);
  }
}