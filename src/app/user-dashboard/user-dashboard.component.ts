import { Component, OnInit } from '@angular/core';
import { MovieHomeTitleComponent } from '../movie-home-title/movie-home-title.component';
import { ProfileNavBarComponent } from '../profile-nav-bar/profile-nav-bar.component';
import { MovieInfo } from '../../models/models';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieServices } from '../../services/movie-service';
import { TokenService } from '../../services/token-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [ProfileNavBarComponent, MovieHomeTitleComponent, CommonModule, HttpClientModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  constructor(
    private movieServices: MovieServices,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadMostViewed(this.movieList, 10);
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

  private async loadUserInfo() {
    this.checkToken();
    var nick = this.tokenService.getUserNickname();
    if (nick){
      this.nickname = nick;
    }
  }

  private checkToken(){
    if (!this.tokenService.isLogged){
      alert('You must be logged in to access the dashboard. Redirecting to Login');
      this.router.navigate(['/login']);
    }
  }

  nickname: string = "JhonDoe33";
  movieList: MovieInfo[] = [];
}
