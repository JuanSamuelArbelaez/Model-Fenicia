import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubscriptionInfo, SubscriptionRequest } from '../models/models';
import { env as environment } from '../enviornments/env';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = `${environment.apiBaseUrl}`
  constructor(private http: HttpClient) { }

  getCurrentSubscription(userId: string): Promise<SubscriptionInfo> {
    const url = `${this.baseUrl}/get-subscription/${userId}`;
    return new Promise((resolve) => this.http.get<SubscriptionInfo>(url)
    .subscribe({
        next: (response) => resolve(response),
        error: (error) => console.error(error),
    }));
  }

  cancelSubscription(userId: string): Promise<string> {
    const url = `${this.baseUrl}/cancel-subscription/${userId}`;
    return new Promise((resolve) => this.http.request<string>("put", url)
    .subscribe({
        next: (response) => resolve(response),
        error: (error) => console.error(error),
    }));
  }

  addSubscription(req: SubscriptionRequest): Promise<SubscriptionInfo> {
    const url = `${this.baseUrl}/create-subscription`;
    return new Promise((resolve) => this.http.request<SubscriptionInfo>("post", url, {body: req})
    .subscribe({
        next: (response) => resolve(response),
        error: (error) => console.error(error),
    }));
  }

  getAvailableSubscriptions(): SubscriptionInfo[]  {
    return [
      new SubscriptionInfo(
        'Basic',
        9.99,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus, neque quis vulputate placerat, tortor eros fermentum lectus, non elementum neque neque in sapien. Nulla volutpat pellentesque arcu eu sagittis. Duis cursus dui at rhoncus aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris erat metus, cursus et leo quis, porta tristique massa. Cras rhoncus tellus ut lectus accumsan, id luctus tortor interdum. Sed enim arcu, venenatis ac nunc nec, elementum pellentesque nisl. Donec non vehicula dui, in facilisis libero. Aliquam sed porta neque, quis pellentesque eros. Donec tempor odio magna, a convallis enim gravida non. Sed nec ex ante. Integer vel sem diam.'
      ),
      new SubscriptionInfo(
        'Premium',
        19.99,
        'Premium plan with all features.'
      ),
      new SubscriptionInfo(
        'Enterprise',
        49.99,
        'Enterprise plan for large businesses.'
      )
    ]
  }
}
