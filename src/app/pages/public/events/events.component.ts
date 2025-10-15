import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  // Upcoming Events
  upcomingEvents = [
    {
      title: 'Community Outreach Day',
      date: '2024-04-15',
      time: '9:00 AM - 2:00 PM',
      location: 'Church Campus',
      description:
        'Join us as we serve our local community through various outreach activities.',
      category: 'Outreach',
      image: 'assets/images/events/outreach.jpg',
      registrationRequired: true,
    },
    {
      title: 'Youth Conference',
      date: '2024-05-01',
      time: 'All Day',
      location: 'Conference Center',
      description:
        'A day of worship, fellowship, and spiritual growth for our youth.',
      category: 'Youth',
      image: 'assets/images/events/youth-conference.jpg',
      registrationRequired: true,
    },
    {
      title: 'Family Movie Night',
      date: '2024-05-15',
      time: '6:00 PM - 9:00 PM',
      location: 'Fellowship Hall',
      description:
        'Bring the whole family for a fun evening of entertainment and fellowship.',
      category: 'Family',
      image: 'assets/images/events/movie-night.jpg',
      registrationRequired: false,
    },
    {
      title: 'Prayer Breakfast',
      date: '2024-06-01',
      time: '8:00 AM - 10:00 AM',
      location: 'Church Hall',
      description: 'Start your day with fellowship and prayer over breakfast.',
      category: 'Fellowship',
      image: 'assets/images/events/prayer-breakfast.jpg',
      registrationRequired: true,
    },
  ];

  // Event Categories
  categories = [
    { id: 'all', name: 'All Events' },
    { id: 'outreach', name: 'Outreach' },
    { id: 'youth', name: 'Youth' },
    { id: 'family', name: 'Family' },
    { id: 'fellowship', name: 'Fellowship' },
  ];

  selectedCategory = 'all';

  // Filter events by category
  get filteredEvents() {
    if (this.selectedCategory === 'all') {
      return this.upcomingEvents;
    }
    return this.upcomingEvents.filter(
      (event) =>
        event.category.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  ngOnInit(): void {
    // Initialize any necessary data or services
  }
}
