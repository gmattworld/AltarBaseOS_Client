import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = signal<User | null>(null);

  // Placeholder data for dashboard sections
  latestSermon = {
    title: 'The Power of Forgiveness',
    preacher: 'Pastor John Doe',
    date: '2024-08-04',
    thumbnail: 'assets/images/sermon-thumbnail.jpg' // Placeholder image
  };
  upcomingEvents = [
    { name: 'Community BBQ', date: '2024-08-15', time: '1:00 PM', location: 'Church Grounds' },
    { name: 'Youth Group Movie Night', date: '2024-08-22', time: '7:00 PM', location: 'Youth Hall' }
  ];
  recentDonations = [
    { amount: 50.00, date: '2024-07-28', fund: 'General Fund' },
    { amount: 100.00, date: '2024-07-14', fund: 'Missions' }
  ];

  quickLinks = [
    { name: 'Give Online', path: '/giving', iconPath: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'View Events', path: '/events', iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'My Profile', path: '/members/profile', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Prayer Requests', path: '/members/prayer', iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user.set(this.authService.getCurrentUser());
  }
}
