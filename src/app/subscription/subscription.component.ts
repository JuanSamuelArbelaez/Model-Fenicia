import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionInfo } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  @Input() subscription: SubscriptionInfo = new SubscriptionInfo("Plan Name", 25000, "description");
  @Output() requestNewSubscription = new EventEmitter<SubscriptionInfo>();
  @Output() requestCancelSubscription = new EventEmitter<SubscriptionInfo>();

  constructor(private router: Router) {}

  cancelSubscription() {
    this.subscription.isInfoOnly = true;
    this.requestCancelSubscription.emit(this.subscription);
  }

  getSubscription() {
    const currentRoute = this.router.url;
    if (currentRoute === '/home') {
      this.router.navigate(['/login']);
    } else if (currentRoute === '/dashboard') {
      this.subscription.isInfoOnly = false;
      this.requestNewSubscription.emit(this.subscription);
    }
  }
}



