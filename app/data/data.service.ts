import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) {}

  async getPosts(companyName:any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    headers.append('Content-type', 'text/html');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    let i =await this.http.post('http://localhost:3000/homes.html/analysis', companyName, {headers:headers})
    .pipe(map((res:any)=>res));
    return i;
  }
}
