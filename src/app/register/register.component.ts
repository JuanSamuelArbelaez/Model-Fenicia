import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserCredentials } from '../../models/models';
import { UserServices } from '../../services/user-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userServices: UserServices) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', Validators.required, Validators.maxLength(10)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.registerForm.valid){
      alert('The registration form is not valid. Please try again.')
      return;
    }
    if (confirm('You will be registered with the following information. Would you like to proceed?')){
      let data: UserCredentials = {
        Password: this.registerForm.get('password')?.value,
        Nickname: this.registerForm.get('nickname')?.value,
        Email: this.registerForm.get('email')?.value,
        ID: ""};
    
      this.userServices.register(data)
      .then((response) => {
          alert('Registration successful. Redirecting to your dashboard.')
          this.router.navigate(['/dashboard'])
        }
      )
      .catch((error) => {
        alert(error);
        console.log(error);
      });
    }
  }

  isPasswordMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('passwordConfirm')?.value;
    return password === confirmPassword;
  }
}
