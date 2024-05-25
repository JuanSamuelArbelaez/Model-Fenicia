import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MovieHomeTitleComponent } from '../movie-home-title/movie-home-title.component';
import { MovieInfo, SubscriptionDisplay } from '../../models/models';
import { MovieServices } from '../../services/movie-service';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from '../subscription/subscription.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    MovieHomeTitleComponent,
    MovieHomeTitleComponent,
    CommonModule,
    SubscriptionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private movieServices: MovieServices) { }
  
  ngOnInit(): void {
    this.loadMostViewed(this.movieList, 2);
  }
  currentIndex = 0;
  movieList: MovieInfo[] = [];
  subscriptions: SubscriptionDisplay[] = [
    {
      plan: 'Basic',
      price: 9.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus, neque quis vulputate placerat, tortor eros fermentum lectus, non elementum neque neque in sapien. Nulla volutpat pellentesque arcu eu sagittis. Duis cursus dui at rhoncus aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris erat metus, cursus et leo quis, porta tristique massa. Cras rhoncus tellus ut lectus accumsan, id luctus tortor interdum. Sed enim arcu, venenatis ac nunc nec, elementum pellentesque nisl. Donec non vehicula dui, in facilisis libero. Aliquam sed porta neque, quis pellentesque eros. Donec tempor odio magna, a convallis enim gravida non. Sed nec ex ante. Integer vel sem diam.'
    },
    {
      plan: 'Premium',
      price: 19.99,
      description: 'Premium plan with all features.'
    },
    {
      plan: 'Enterprise',
      price: 49.99,
      description: 'Enterprise plan for large businesses.'
    }
  ];

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
