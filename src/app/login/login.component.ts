import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { UserServices } from '../../services/user-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userServices: UserServices) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ]],
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid){
      alert('Please enter a valid email address and valid password.');
      return;
    }

    this.userServices.login
  }
}
