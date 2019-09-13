import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Source } from './source.model';
import * as globals from '../globals';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  readonly rootURL = globals.localhostURL;
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

  postSource(source: Source){
    return this.http.post(this.rootURL+"/Sources", source);
  }
}
