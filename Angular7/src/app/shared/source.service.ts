import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  readonly rootURL = "http://localhost:44380/api";
  constructor(private http: HttpClient) { }

  getSource(sourceName : string){
    return this.http.get(this.rootURL+"/Sources/" + sourceName).toPromise();
  }

  getSources(){
    return this.http.get(this.rootURL+"/Sources").toPromise();
  }

  deleteSource(id: number){
    return this.http.delete(this.rootURL+"/Sources/" + id);
  }
}
