import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../Models/apiResponse';
import { PlaceCemetaryDto } from '../Models/placeCemetaryDto';

@Injectable({
  providedIn: 'root'
})
export class PlaceCemeteryService {

  constructor(private http: HttpClient) { }
  getPlaceCemetery(): Observable<ApiResponse>{
      return this.http.get<ApiCollectionResponse>("https://localhost:44339/api/placeCemetery");
    }
  
    deletePlaceCemetery(id: number): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>('https://localhost:44339/api/placeCemetery?id=' + id);
    }
  
    addPlaceCemetery(book: PlaceCemetaryDto): Observable<ApiResponse>{
      console.log(book)
      return this.http.post<ApiResponse>('https://localhost:44339/api/placeCemetery/Add',book);
    } 
  
    updatePlaceCemetery(book: PlaceCemetaryDto): Observable<ApiResponse>{
      return this.http.post<ApiResponse>('https://localhost:44339/api/placeCemetery/Update',book);
    } 

}
