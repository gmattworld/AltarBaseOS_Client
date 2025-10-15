import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { SafePipe } from "../../../infrastructure/pipes/safe.pipe";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SafePipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  // Church Information
  churchName = environment.churchName;
  churchAddress = environment.churchAddress;
  churchCity = environment.churchCity;
  churchState = environment.churchState;
  churchZip = environment.churchZip;
  churchPhone = environment.churchPhone;
  churchEmail = environment.churchEmail;

  // Contact Form
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  // Contact Methods
  contactMethods = [
    {
      title: 'Phone',
      description: 'Call us directly',
      value: this.churchPhone,
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    {
      title: 'Email',
      description: 'Send us an email',
      value: this.churchEmail,
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      title: 'Address',
      description: 'Visit us in person',
      value: `${this.churchAddress}, ${this.churchCity}, ${this.churchState} ${this.churchZip}`,
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
    },
  ];

  // Office Hours
  officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  onSubmit() {
    // TODO: Implement form submission
    console.log('Form submitted:', this.contactForm);
  }

  ngOnInit(): void {
    // Initialize any necessary data or services
  }

  // Google Maps URL
  get googleMapsUrl(): string {
    const address = `${this.churchAddress}, ${this.churchCity}, ${this.churchState} ${this.churchZip}`;
    const apiKey = environment.googleMapsApiKey;
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
      address
    )}`;
  }
}
