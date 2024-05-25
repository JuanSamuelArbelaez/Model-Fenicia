import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionDisplay } from '../../models/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  @Input() subscription: SubscriptionDisplay = {
    plan: "Plan Name",
    price: 25000,
    description: "description"
  }
}

