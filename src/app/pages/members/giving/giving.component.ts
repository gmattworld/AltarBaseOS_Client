import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { User } from '../../../core/models/user';
import { DialogService, DialogConfig } from '../../../infrastructure/services/dialog.service';
import { InitiateDonationComponent } from './modals/initiate-donation/initiate-donation.component';

@Component({
  selector: 'app-giving',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './giving.component.html',
  styleUrls: ['./giving.component.scss']
})
export class GivingComponent implements OnInit {
  user = signal<User | null>(null);

  previousDonations = [
    { date: '2024-07-28', amount: 50.00, fund: 'General Fund', transactionId: 'TXN123456' },
    { date: '2024-07-14', amount: 100.00, fund: 'Missions', transactionId: 'TXN123455' },
    { date: '2024-06-20', amount: 75.00, fund: 'Building Fund', transactionId: 'TXN123454' },
  ];

  constructor(
    private authService: AuthService,
    private dialog: DialogService
  ) { }

  ngOnInit() {
    this.user.set(this.authService.getCurrentUser());
  }

  openModal() {
    this.dialog.openDialog<any, { amount: number, fund: string }>(InitiateDonationComponent)
      .subscribe(result => {
        if (result) {
          console.log('Donation submitted:', result);
          alert(`Thank you for your generous donation of $${result.amount}!`);
          this.previousDonations.unshift({
            date: new Date().toISOString(),
            amount: result.amount,
            fund: result.fund,
            transactionId: `TXN${Math.floor(Math.random() * 900000) + 100000}`
          });
        }
      });
  }
}
