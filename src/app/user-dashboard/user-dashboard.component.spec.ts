import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDashboardComponent } from './user-dashboard.component';
import { TokenService } from '../../services/token-service';
import { SubscriptionService } from '../../services/subscription-service';
import { PaymentService } from '../../services/payment-service';
import { of } from 'rxjs';
import { PaymentInfo } from '../../models/models';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let tokenService: TokenService;
  let subscriptionService: SubscriptionService;
  let paymentService: PaymentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboardComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        TokenService,
        SubscriptionService,
        PaymentService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    tokenService = TestBed.inject(TokenService);
    subscriptionService = TestBed.inject(SubscriptionService);
    paymentService = TestBed.inject(PaymentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user info on init', () => {
    const user = {ID: '1', Nickname: 'TestUser', Email: 'test@mail.com'};
    spyOn(tokenService, 'getUser').and.returnValue(user);

    component.ngOnInit();

    expect(component.userInfo).toEqual(user);
  });

  it('should get payment history on init', async () => {
    const payments: any[] = [{id: 1, user_id: '1', description: 'Test Payment', amount: 100, status: 'success'}];
    spyOn(paymentService, 'getPaymentHistory').and.returnValue(Promise.resolve(payments));

    await component.ngOnInit();

    expect(component.payments).toEqual(payments);
  });

  it('should handle new subscription', async () => {
    const subscription = {plan: 'Basic', price: 9.99, description: 'Basic Plan', isInfoOnly: true};
    const paymentResponse = {id: 1, user_id: '1', description: 'Subscription Payment: Basic', amount: 9.99, status: 'success'};
    spyOn(paymentService, 'processPayment').and.returnValue(Promise.resolve(paymentResponse));
    spyOn(subscriptionService, 'addSubscription').and.returnValue(Promise.resolve(subscription));

    await component.getNewSubscription(subscription);

    expect(component.currentSubscription).toEqual(subscription);
  });
});
