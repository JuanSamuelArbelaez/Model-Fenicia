import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MovieHomeTitleComponent } from '../movie-home-title/movie-home-title.component';
import { MovieInfo, SubscriptionInfo } from '../../models/models';
import { MovieServices } from '../../services/movie-service';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { SubscriptionService } from '../../services/subscription-service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    MovieHomeTitleComponent,
    MovieHomeTitleComponent,
    CommonModule,
    SubscriptionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private movieServices: MovieServices, private subscriptionService: SubscriptionService) { }
  
  ngOnInit(): void {
    this.loadMostViewed(this.movieList, 2);
    this.subscriptions = this.subscriptionService.getAvailableSubscriptions();
  }
  currentIndex = 0;
  movieList: MovieInfo[] = [];
  subscriptions: SubscriptionInfo[] = [];

  private async loadMostViewed(movieList: MovieInfo[], cant: number) {
    await this.movieServices.getMostViewed(cant)
      .then((response) => {
        var auxList: MovieInfo[];
        auxList =  response.map((movie: { id: any; title: any; overview: any; release_date: any; original_language: any; }) => ({
          ID: movie.id,
          Title: movie.title,
          Overview: movie.overview,
          ReleaseDate: movie.release_date,
          OriginalLanguage: movie.original_language
        }));

        auxList.forEach((movie) => {
          movieList.push(movie);
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  next() {
    if (this.currentIndex < this.subscriptions.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.subscriptions.length - 1;
    }
  }
}
