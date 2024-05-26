import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentInfo } from '../models/models';
import { assert } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  getPaymentHistory(): Promise<PaymentInfo[]> {
    return new Promise((resolve) => this.http.get<PaymentInfo[]>('/api/payment-history')
    .subscribe({
        next: (response) => resolve(response),
        error: (error) => console.log(error)
    }));
  }
}