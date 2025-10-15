import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { SafePipe } from '../../../infrastructure/pipes/safe.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SafePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Church Information
  churchName = environment.churchName;
  churchAddress = environment.churchAddress;
  churchCity = environment.churchCity;
  churchState = environment.churchState;
  churchZip = environment.churchZip;
  churchPhone = environment.churchPhone;
  churchEmail = environment.churchEmail;

  // Service Times
  sundayService1 = environment.sundayService1;
  sundayService2 = environment.sundayService2;
  wednesdayService = environment.wednesdayService;

  // Weekly Schedule
  weeklySchedule = [
    { day: 'Sunday', time: this.sundayService1, type: 'Morning Service' },
    { day: 'Sunday', time: this.sundayService2, type: 'Evening Service' },
    { day: 'Wednesday', time: this.wednesdayService, type: 'Bible Study' },
  ];

  // Upcoming Events
  upcomingEvents = [
    {
      title: 'Youth Night',
      date: '2024-03-15',
      time: '6:00 PM',
      description: 'Special evening for our youth members',
    },
    {
      title: 'Community Outreach',
      date: '2024-03-20',
      time: '10:00 AM',
      description: 'Join us as we serve our community',
    },
  ];

  // Ministries
  ministries = [
    {
      title: "Children's Ministry",
      description: 'Nurturing young hearts in faith',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      title: 'Youth Ministry',
      description: 'Empowering the next generation',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
    {
      title: 'Music Ministry',
      description: 'Praising through song',
      icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    },
    {
      title: 'Outreach Ministry',
      description: 'Serving our community',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    },
  ];

  // Google Maps URL
  get googleMapsUrl(): string {
    const address = `${this.churchAddress}, ${this.churchCity}, ${this.churchState} ${this.churchZip}`;
    const apiKey = environment.googleMapsApiKey;
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
      address
    )}`;
  }

  ngOnInit(): void {
    // Initialize any necessary data or services
  }
}
