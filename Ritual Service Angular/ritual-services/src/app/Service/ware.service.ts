import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../Models/apiResponse';
import { WareDto } from '../Models/wareDto';

@Injectable({
  providedIn: 'root'
})
export class WareService {

  constructor(private http: HttpClient) { }
    getWare(): Observable<ApiResponse>{
      return this.http.get<ApiCollectionResponse>("https://localhost:44339/api/ware");
    }
  
    deleteWare(id: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>('https://localhost:44339/api/ware?id=' + id);
    }
  
    addWare(book: WareDto): Observable<ApiResponse>{
      console.log(book)
      return this.http.post<ApiResponse>('https://localhost:44339/api/ware/Add',book);
    } 
  
    updateWare(book: WareDto): Observable<ApiResponse>{
      return this.http.post<ApiResponse>('https://localhost:44339/api/ware/Update',book);
    }

    getWareCategory(category:string): Observable<ApiCollectionResponse>{
      return this.http.get<ApiCollectionResponse>("https://localhost:44339/api/ware/"+category);
    }
}
