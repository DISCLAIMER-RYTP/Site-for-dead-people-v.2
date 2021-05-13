import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../Models/apiResponse';
import { EmployersDto } from '../Models/employersDto';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

constructor(private http:HttpClient) { }
headers: HttpHeaders = new HttpHeaders();

getEmployees():Observable<ApiResponse>{
  return this.http.get<ApiCollectionResponse>("https://localhost:44339/api/employees");
}

deleteEmployees(id: number): Observable<ApiResponse> {
  return this.http.delete<ApiResponse>('https://localhost:44339/api/employees?id=' + id);
}

addEmployees(form: FormData): Observable<ApiResponse>{
  this.headers.append('Content-Type', 'multipart/form-data');
  return this.http.post<ApiResponse>('https://localhost:44339/api/employees/Add',form, {headers: this.headers});
} 

updateEmployees(book: EmployersDto): Observable<ApiResponse>{
  
  return this.http.post<ApiResponse>('https://localhost:44339/api/employees/Update',book);
} 

}
