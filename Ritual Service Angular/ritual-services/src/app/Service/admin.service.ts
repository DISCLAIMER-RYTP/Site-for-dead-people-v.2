
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/apiResponse';
import { EmployersDto } from '../Models/employersDto';
import { FuneralOrderDto } from '../Models/funeralOrderDto';
import { WareDto } from '../Models/wareDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  deleteFuneralOrder(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>('https://localhost:44339/api/funeralOrder?id=' + id);
  }

  addFuneralOrder(book: FuneralOrderDto): Observable<ApiResponse> {
    console.log(book)
    return this.http.post<ApiResponse>('https://localhost:44339/api/funeralOrder/Add', book);
  }

  updateFuneralOrder(book: FuneralOrderDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44339/api/funeralOrder/Update', book);
  }


  deleteWare(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>('https://localhost:44339/api/ware?id=' + id);
  }

  addWare(book: WareDto): Observable<ApiResponse> {
    console.log(book)
    return this.http.post<ApiResponse>('https://localhost:44339/api/ware/Add', book);
  }

  updateWare(book: WareDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44339/api/ware/Update', book);
  }

  
deleteEmployees(id: number): Observable<ApiResponse> {
  return this.http.delete<ApiResponse>('https://localhost:44339/api/employees?id=' + id);
}

addEmployees(book: EmployersDto): Observable<ApiResponse>{
  console.log(book)
  return this.http.post<ApiResponse>('https://localhost:44339/api/employees/Add',book);
} 

updateEmployees(book: EmployersDto): Observable<ApiResponse>{
  return this.http.post<ApiResponse>('https://localhost:44339/api/employees/Update',book);
} 

}