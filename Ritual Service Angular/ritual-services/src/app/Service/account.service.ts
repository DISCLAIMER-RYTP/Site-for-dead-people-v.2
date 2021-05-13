import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse, ResultLoginDto } from '../Models/apiResponse';
import { RegisterDto } from 'src/app/Models/registerDto';
import { EditDto, LoginDto } from 'src/app/Models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  headers: HttpHeaders = new HttpHeaders();
  loginStatus = new EventEmitter<boolean>();
  photoStatus = new EventEmitter<boolean>();
  
  constructor(private http: HttpClient) { }
  register(form: FormData): Observable<ApiResponse> {
    console.log(form.get('dto'));
    return this.http.post<ApiResponse>('https://localhost:44339/api/account/register', form);
  }
  login(user: LoginDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44339/api/account/login', user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (decodedJwtData.roles != null) {
        return true;
      }
      else{
        return false;
      }
    }
    else {
      return false;
    }
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (decodedJwtData.roles == "Admin") {
        return true;
      }
      else{
        return false;
      }
    }
    else {
      return false;
    }
  }


  UploadPhoto(id: string, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44339/api/image/UploadImage/'+id, file, {headers: this.headers})
  }

  UploadPhotoEmp(id: string, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44339/api/image/UploadImageEmp/'+id, file, {headers: this.headers})
  }

  LogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("Id");
    this.loginStatus.emit(false);
  }

  getUser(id: string):  Observable<ApiResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44339/api/account/Profile?id=' + id);
  }

  getUsers():  Observable<ApiResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44339/api/account/Users');
  }

  editUser(x: EditDto):  Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44339/api/account/edit', x);
  }
}