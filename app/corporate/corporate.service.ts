import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

 
  constructor(private http : HttpClient) { }

  async submitValues(values:any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
  //  headers.append('Content-type', 'text/html');
     headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    let i=await  this.http.post('http://localhost:3000/reg',values,{headers:headers})
    .pipe(map((res:any)=>res));
    return i;
  }


  async loginValues(values1:any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
  //  headers.append('Content-type', 'text/html');
     headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    let i = await  this.http.post('http://localhost:3000/log',values1,{headers:headers})
    .pipe(map((resp:any)=>resp));
    return i;
  }

  

}
