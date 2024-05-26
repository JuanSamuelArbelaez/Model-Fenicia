import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'profile-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './profile-nav-bar.component.html',
  styleUrl: './profile-nav-bar.component.scss'
})
export class ProfileNavBarComponent {
  constructor(private router: Router, private authService: TokenService){}
   logOut(){
    if(this.authService.isLogged()){
      this.authService.loggout();
      alert("Loging out...");
      this.router.navigate(['/login']);
    }
  }
}
