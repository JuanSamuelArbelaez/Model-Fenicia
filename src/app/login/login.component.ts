import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { UserServices } from '../../services/user-service';
import { UserCredentials } from '../../models/models';
import { TokenService } from '../../services/token-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder, private userServices: UserServices, private authService: TokenService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ]],
    });
  }

  async onSubmit() {
    if (!this.loginForm.valid){
      alert('Please enter a valid email address and valid password.');
      return;
    }
    var info: UserCredentials = {
      Password: this.loginForm.get('password')?.value,
      Nickname: "",
      Email: this.loginForm.get('email')?.value,
      ID: "",
    }
    await this.userServices.login(info).then((response) => {
      this.authService.setUser(response.user);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      alert(error.message)
    });
  }
}
