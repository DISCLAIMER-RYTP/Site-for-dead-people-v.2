import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../Models/apiResponse';
import { FuneralOrderDto } from '../Models/funeralOrderDto';

@Injectable({
  providedIn: 'root'
})
export class FuneralOrderService {

  constructor(private http: HttpClient) { }
  getFuneralOrder(): Observable<ApiResponse>{
      return this.http.get<ApiCollectionResponse>("https://localhost:44339/api/funeralOrder");
    }
  
    deleteFuneralOrder(id: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>('https://localhost:44339/api/funeralOrder?id=' + id);
    }
  
    addFuneralOrder(book: FuneralOrderDto): Observable<ApiResponse>{
      console.log(book)
      return this.http.post<ApiResponse>('https://localhost:44339/api/funeralOrder/Add',book);
    } 
  
    updateFuneralOrder(book: FuneralOrderDto): Observable<ApiResponse>{
      return this.http.post<ApiResponse>('https://localhost:44339/api/funeralOrder/Update',book);
    }
}
