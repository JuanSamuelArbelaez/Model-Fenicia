import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentInfo } from '../models/models';
import { env as environment } from '../enviornments/env';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = `${environment.apiBaseUrl}`
  constructor(private http: HttpClient) { }

  getPaymentHistory(userID: string): Promise<PaymentInfo[]> {
    const url = `${this.baseUrl}/get-payments/${userID}`;
    return new Promise((resolve) => this.http.get<PaymentInfo[]>(url)
    .subscribe({
        next: (response) => resolve(response),
        error: (error) => console.log(error)
    }));
  }

  processPayment(payInfo: PaymentInfo): Promise<any> {
    const url = `${this.baseUrl}/process-payment`;
    return new Promise((resolve) => this.http.request<any>("post", url, {body: payInfo})
    .subscribe({
        next: (response) => resolve(response),
        error: (error) => console.log(error)
    }));
  }
}