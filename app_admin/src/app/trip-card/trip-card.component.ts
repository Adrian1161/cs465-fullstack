import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Trip } from '../models/trip';  // Import the Trip model

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule], // Ensure CommonModule is included for Angular functionality like ngIf
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip;  // Define trip as a Trip type for better type safety

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService  // Inject AuthenticationService
  ) {}

  ngOnInit(): void {}

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Edit trip if logged in
  public editTrip(trip: Trip): void {
    if (this.isLoggedIn()) {  // Only allow editing if the user is logged in
      localStorage.removeItem('tripCode');
      localStorage.setItem('tripCode', trip.code);  // Store the trip code to localStorage
      this.router.navigate(['edit-trip']);  // Navigate to the edit-trip page
    } else {
      // Show an alert or redirect to the login page if not logged in
      alert('Please log in to edit trips!');
      this.router.navigate(['login']);
    }
  }
}
