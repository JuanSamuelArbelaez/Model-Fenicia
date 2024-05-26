import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieHomeTitleComponent } from '../movie-home-title/movie-home-title.component';
import { ProfileNavBarComponent } from '../profile-nav-bar/profile-nav-bar.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { MovieInfo, SubscriptionInfo, PaymentInfo, UserProfile, SubscriptionRequest } from '../../models/models';
import { MovieServices } from '../../services/movie-service';
import { TokenService } from '../../services/token-service';
import { SubscriptionService } from '../../services/subscription-service';
import { PaymentService } from '../../services/payment-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProfileNavBarComponent,
    MovieHomeTitleComponent,
    SubscriptionComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userInfo: UserProfile = {ID: "ID", Nickname: "Nickname", Email: "mail"};
  movieList: MovieInfo[] = [];
  currentSubscription: SubscriptionInfo | null = null;
  availableSubscriptions: SubscriptionInfo[] = [];
  payments: any[] = [];

  constructor(
    private movieServices: MovieServices,
    private tokenService: TokenService,
    private subscriptionService: SubscriptionService,
    private paymentService: PaymentService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    if(!this.tokenService.isLogged()){
      alert("Please login first");
      this.router.navigate(['/login']);
    }
    this.loadUserInfo();
    this.filterSubscriptions()
    this.loadMostViewed(6);
    this.loadCurrentSubscription();
    this.availableSubscriptions = this.subscriptionService.getAvailableSubscriptions();
    this.loadPaymentHistory();
  }



  private async loadMostViewed(cant: number) {
    try {
      const response = await this.movieServices.getMostViewed(cant);
      const auxList = response.map((movie: { id: any; title: any; overview: any; release_date: any; original_language: any; }) => ({
        ID: movie.id,
        Title: movie.title,
        Overview: movie.overview,
        ReleaseDate: movie.release_date,
        OriginalLanguage: movie.original_language
      }));
      this.movieList.push(...auxList);
    } catch (error) {
      console.log(error);
    }
  }

  private async loadCurrentSubscription(){
    this.subscriptionService.getCurrentSubscription(this.userInfo.ID).then((response) => {
      this.currentSubscription = response;
    });
  }

  private async loadPaymentHistory() {
    await this.paymentService.getPaymentHistory(this.userInfo.ID)
    .then((response) => {
      console.log(response);
      this.payments = response;
    }).catch((error) => {
      this.payments = [];
      console.log(error);
    });
  }

  private async loadUserInfo() {
    var info = this.tokenService.getUser();
    if (info){
      this.userInfo.ID = info.ID;
      this.userInfo.Email = info.Email;
      this.userInfo.Nickname = info.Nickname;
    }
  }

  updateUserInfo() {
    console.log("User info updated:", this.userInfo.Nickname);
  }

  filterSubscriptions(): SubscriptionInfo[] {
    this.availableSubscriptions.forEach(element => {
      element.isInfoOnly = (element.plan != this.currentSubscription?.plan)
    });

    return this.availableSubscriptions;
  }

  updateSubscriptionList(subscription: SubscriptionInfo) {
    if (!subscription.isInfoOnly) {
      this.currentSubscription = subscription;
      this.filterSubscriptions();
    }
  }
  
  async getNewSubscription(subscription: SubscriptionInfo) {
    // Verificar si ya hay una suscripción activa
    if (this.currentSubscription) {
        alert("Ya tienes una suscripción activa. No se puede agregar una nueva suscripción.");
        return;
    }

    // Continuar con el proceso de pago y suscripción
    var payRequest: PaymentInfo = {
        ID: 0,
        User_ID: this.userInfo.ID,
        Amount: subscription.price,
        Description: "Subscription Payment: " + subscription.plan,
        Status: ""
    }

    if (!confirm(`¿Desea procesar el pago por el plan ${subscription.plan}, por un valor de ${subscription.price}?`)) {
        alert("Error al adquirir la suscripción");
        return;
    }

    await this.paymentService.processPayment(payRequest)
        .then((response) => {
            alert("Pago exitoso: " + response.id + " - Asignando suscripción...");
        }).catch((error) => {
            alert("Pago fallido. Intente nuevamente.")
            console.log(error);
            return;
        });

    await this.loadPaymentHistory();

    var subRequest: SubscriptionRequest = {
        ID: 0,
        User_ID: this.userInfo.ID,
        Plan: subscription.plan,
        Price: subscription.price,
        Description: subscription.description,
        Status: ""
    }

    await this.subscriptionService.addSubscription(subRequest).then((response) => {
        subscription.isInfoOnly = false;
        var sub: SubscriptionInfo = {
            plan: response.plan,
            description: response.description,
            price: response.price,
            isInfoOnly: false
        }
        response.isInfoOnly = false;
        this.updateSubscriptionList(response);
        alert("Suscripción añadida con éxito")
    }).catch((error) => {
        console.log(error)
        alert("Error al añadir la suscripción, intente nuevamente.")
    });
}


  async cancelCurrentSubscription(subscription: SubscriptionInfo) {
    
    await this.subscriptionService.cancelSubscription(this.userInfo.ID)
    .then((response) => {
      this.currentSubscription = null;
      this.filterSubscriptions();
      alert(response)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }
}
