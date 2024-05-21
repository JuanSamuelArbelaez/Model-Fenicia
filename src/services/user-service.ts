import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { env as environment } from '../enviornments/env';
import * as models from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private baseUrl = `${environment.apiBaseUrl}/user`
  constructor(private http: HttpClient) {
  }

  login(loginData: models.UserCredentials): Promise<any> {
    const url = `${this.baseUrl}/login`;
    return new Promise(resolve => (
      this.http.request<models.UserCredentials>("post", url, { body: loginData })
        .subscribe({
          next: (response) => {resolve(response)},
          error: (error) => {alert(error)}})
    ));
  }

  register(registroData: models.UserCredentials): Promise<any>{
    const url = `${this.baseUrl}/register`;
    return new Promise(resolve =>{
      this.http.request<models.UserCredentials>("post", url, {body: registroData})
        .subscribe({
          next: (response) => {resolve(response)},
          error: (error) =>{alert(error)}})
    });
  }

  modifyUser(userId: string): Promise<any>{
    const url = `${this.baseUrl}/${userId}`;
    return new Promise(resolve =>{
      this.http.request<models.UserCredentials>("put", url)
        .subscribe({
          next: (response) => {resolve(response)},
          error: (error) =>{alert(error.error.message)}})
    });
  }
}