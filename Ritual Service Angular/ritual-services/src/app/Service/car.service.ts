import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../Models/apiResponse';
import { CarDto } from '../Models/carDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {

constructor(private http:HttpClient) { }
getCar():Observable<ApiResponse>{
  return this.http.get<ApiCollectionResponse>("https://localhost:44339/api/Car"); 
}

deleteCar(id: number): Observable<ApiResponse> {
  return this.http.delete<ApiResponse>('https://localhost:44339/api/Car?id=' + id);
}

addCar(book: CarDto): Observable<ApiResponse>{
  console.log(book)
  return this.http.post<ApiResponse>('https://localhost:44339/api/Car/Add',book);
} 

updateCar(book: CarDto): Observable<ApiResponse>{
  return this.http.post<ApiResponse>('https://localhost:44339/api/Car/Update',book);
} 


}
