import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  // Constructor - Inject storage and tripDataService
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Get JWT Token from Local Storage
  public getToken(): string {
    let out: any = this.storage.getItem('travlr-token');
    return out ? out : '';
  }

  // Save Token to Local Storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout - Remove Token from Storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check if User is Logged In and Token is Still Valid
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    return false;
  }

  // Get Current User from Token
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login Method - Calls tripDataService.login()
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  // Register Method - Calls tripDataService.register()
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }
}
