import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HomesService {



  constructor(private http : HttpClient) { }
//  getPosts(body:any){
//       return this.http.post("http://localhost:3000/homes.html/details",body);
//   }

  async getPosts(newContact:any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    headers.append('Content-type', 'text/html');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    let i =await this.http.post('http://localhost:3000/homes.html/details', newContact, {headers:headers})
    .pipe(map((res:any)=>res));
    return i;
  }

  //   getPosts(newContact:any){
  //   // var headers = new HttpHeaders();
  // //  headers.append('Content-type', 'application/json');
  // // // headers.append('Content-type', 'text/html');
  // //   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   return this.http.post('http://localhost:3000/homes.html/details', newContact);
  //    }
  






}
