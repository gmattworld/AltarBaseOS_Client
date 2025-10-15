import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonationService } from '../../../infrastructure/services/donation.service';

@Component({
  selector: 'app-online-giving',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './online-giving.component.html',
  styleUrl: './online-giving.component.scss'
})
export class OnlineGivingComponent {
  donationForm: FormGroup;
  isSubmitting = false;
  submissionError: string | null = null;
  submissionSuccess = false;

  constructor(
    private fb: FormBuilder,
    private donationService: DonationService
  ) {
    this.donationForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      currency: ['USD', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: [''],
      paymentMethod: ['credit', Validators.required],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      bankAccountNumber: [''],
      bankRoutingNumber: [''],
      isRecurring: [false],
      recurringFrequency: [''],
      designation: [''],
      message: ['']
    });
  }

  onSubmit() {
    if (this.donationForm.valid) {
      this.isSubmitting = true;
      this.submissionError = null;
      this.submissionSuccess = false;

      this.donationService.processDonation(this.donationForm.value).subscribe({
        next: (response) => {
          this.submissionSuccess = true;
          this.donationForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submissionError = 'There was an error processing your donation. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }

  get paymentMethod() {
    return this.donationForm.get('paymentMethod')?.value;
  }

  get isRecurring() {
    return this.donationForm.get('isRecurring')?.value;
  }
}
