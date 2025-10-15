import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-initiate-donation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './initiate-donation.component.html',
  styleUrls: ['./initiate-donation.component.scss']
})
export class InitiateDonationComponent implements OnInit {
  donationForm!: FormGroup;

  donationFunds = ['General Fund', 'Missions', 'Building Fund', 'Community Outreach'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InitiateDonationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.donationForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      fund: [this.donationFunds[0], Validators.required],
      isRecurring: [false],
    });
  }

  setDonationAmount(amount: number) {
    this.donationForm.get('amount')?.setValue(amount);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.donationForm.invalid) {
      return;
    }
    this.dialogRef.close(this.donationForm.value);
  }
}
