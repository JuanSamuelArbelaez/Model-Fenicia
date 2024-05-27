import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment-service';
import { PaymentInfo } from '../models/models';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });

    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch payment history', () => {
    const dummyPayments: PaymentInfo[] = [
      { ID: 1, User_ID: 'user1', Amount: 100, Description: 'Payment 1', Status: 'success' },
      { ID: 2, User_ID: 'user1', Amount: 200, Description: 'Payment 2', Status: 'success' }
    ];

    service.getPaymentHistory('user1').then(payments => {
      expect(payments.length).toBe(2);
      expect(payments).toEqual(dummyPayments);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/get-payments/user1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPayments);
  });

  it('should process a payment', () => {
    const dummyPayment: PaymentInfo = { ID: 1, User_ID: 'user1', Amount: 100, Description: 'Payment 1', Status: 'success' };

    service.processPayment(dummyPayment).then(payment => {
      expect(payment).toEqual(dummyPayment);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/get-payment`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyPayment);
  });
});
