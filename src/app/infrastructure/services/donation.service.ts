import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donation } from '../../core/models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = 'api/donations'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  processDonation(donation: Donation): Observable<any> {
    // In a real application, you would:
    // 1. Validate the donation data
    // 2. Process the payment through a payment gateway (e.g., Stripe)
    // 3. Store the donation record in your database
    // 4. Send confirmation emails
    
    // For now, we'll just simulate a successful donation
    return this.http.post(this.apiUrl, donation);
  }

  getDonationHistory(userId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}/history/${userId}`);
  }

  getDonationSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary`);
  }
} 