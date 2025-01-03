import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Flag} from './models/flag';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  private baseUrl = 'http://localhost:5000/flag';

  constructor(private http: HttpClient) {}

  getFlag(name: string): Observable<Flag> {
    const params = { name: name };
    return this.http.get<Flag>(`${this.baseUrl}/get_flag/`,  { params });
  }

  setFlag(name: string, active:boolean): Observable<Flag> {
    const params = { name: name , active: active};
    return this.http.get<Flag>(`${this.baseUrl}/set_flag/`,  { params });
  }
}
