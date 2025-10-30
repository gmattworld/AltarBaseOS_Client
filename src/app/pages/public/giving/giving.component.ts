import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-giving',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './giving.component.html',
  styleUrls: ['./giving.component.scss'],
})
export class GivingComponent implements OnInit {

  // Giving Form
  givingForm = {
    amount: '',
    frequency: 'one-time',
    fund: 'general',
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  // Giving Funds
  givingFunds = [
    {
      id: 'general',
      name: 'General Fund',
      description: 'Support the general operations of the church',
    },
    {
      id: 'missions',
      name: 'Missions',
      description: 'Support our local and global mission work',
    },
    {
      id: 'youth',
      name: 'Youth Ministry',
      description: 'Support youth programs and activities',
    },
    {
      id: 'building',
      name: 'Building Fund',
      description: 'Support church facilities and maintenance',
    },
    {
      id: 'benevolence',
      name: 'Benevolence',
      description: 'Support those in need in our community',
    },
  ];

  // Giving Frequencies
  frequencies = [
    { id: 'one-time', name: 'One-time Gift' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'bi-weekly', name: 'Bi-weekly' },
    { id: 'monthly', name: 'Monthly' },
  ];

  // Suggested Amounts
  suggestedAmounts = [50, 100, 250, 500, 1000];

  onSubmit() {
    // TODO: Implement payment processing
    console.log('Giving form submitted:', this.givingForm);
  }

  setAmount(amount: number) {
    this.givingForm.amount = amount.toString();
  }

  ngOnInit(): void {
    // Initialize any necessary data or services
  }
}
