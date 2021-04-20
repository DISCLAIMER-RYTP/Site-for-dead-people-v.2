import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/apiResponse';
import { LoginDto } from '../Models/loginDto';
import { RegisterDto } from '../Models/registerDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  loginStatus = new EventEmitter<boolean>();
  baseUrl = '/api/Account';
  
    isLoggedIn()
    {
      const token = localStorage.getItem('token');
      if(token!=null){
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        if(decodedJwtData.roles!=null){
          return true;
        }
      else{
        return false;
      }
  
      }
      else{
        return false;
      }
    }
  
    SingIn(UserLoginDto: LoginDto): Observable<ApiResponse>{
      return this.http.post<ApiResponse>(this.baseUrl + '/login', UserLoginDto)
    }
    SingUp(UserLoginDto: RegisterDto): Observable<ApiResponse>{
      return this.http.post<ApiResponse>(this.baseUrl + '/register', UserLoginDto)
    }
  
    Logout(){
      this.loginStatus.emit(false);
      localStorage.removeItem('token');
    }
}
