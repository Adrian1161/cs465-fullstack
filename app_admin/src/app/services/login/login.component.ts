import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {
  // Define form-related variables
  public formError: string = '';
  submitted = false;
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  // Constructor to inject dependencies
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  // ngOnInit lifecycle hook
  ngOnInit(): void {}

  // On submit, validate the form and proceed with login if valid
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      this.doLogin();
    }
  }

  // Handles the login process
  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    // Call the login method from AuthenticationService
    this.authenticationService.login(newUser, this.credentials.password);

    // Check if the user is logged in
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']); // Navigate to home or dashboard
    } else {
      var timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']); // Navigate to home after a short delay
        }
      }, 3000); // Retry after 3 seconds
    }
  }
}
