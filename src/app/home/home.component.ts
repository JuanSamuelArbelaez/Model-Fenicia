import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MovieHomeTitleComponent } from '../movie-home-title/movie-home-title.component';
import { MovieInfo } from '../../models/models';
import { MovieServices } from '../../services/movie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, MovieHomeTitleComponent, MovieHomeTitleComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private movieServices: MovieServices) { }
  
  ngOnInit(): void {
    this.loadMostViewed(this.movieList, 2);
  }

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
  movieList: MovieInfo[] = [];
}
