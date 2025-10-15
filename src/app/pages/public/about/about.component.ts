import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  // Church Information
  churchName = environment.churchName;
  churchAddress = environment.churchAddress;
  churchCity = environment.churchCity;
  churchState = environment.churchState;
  churchZip = environment.churchZip;
  churchPhone = environment.churchPhone;
  churchEmail = environment.churchEmail;

  // History
  history = {
    year: '1990',
    description:
      'Founded with a vision to serve our community and spread the message of hope and love.',
    milestones: [
      {
        year: '1990',
        title: 'Our Beginning',
        description:
          'Started as a small congregation meeting in a community center.',
      },
      {
        year: '2000',
        title: 'First Building',
        description:
          'Built our first church building to accommodate our growing congregation.',
      },
      {
        year: '2010',
        title: 'Community Center',
        description:
          'Expanded our facilities to include a community center for outreach programs.',
      },
      {
        year: '2020',
        title: 'Digital Ministry',
        description:
          'Launched our digital ministry to reach more people through technology.',
      },
    ],
  };

  // Leadership Team
  leadershipTeam = [
    {
      name: 'Rev. John Smith',
      role: 'Senior Pastor',
      image: 'assets/images/leadership/pastor.jpg',
      bio: 'Leading our congregation with wisdom and compassion for over 15 years.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Worship Director',
      image: 'assets/images/leadership/worship.jpg',
      bio: 'Guiding our worship ministry to create meaningful spiritual experiences.',
    },
    {
      name: 'Michael Brown',
      role: 'Youth Pastor',
      image: 'assets/images/leadership/youth.jpg',
      bio: 'Empowering the next generation through faith and fellowship.',
    },
    {
      name: 'Emily Davis',
      role: "Children's Ministry Director",
      image: 'assets/images/leadership/children.jpg',
      bio: 'Nurturing young hearts in faith and love.',
    },
  ];

  // Core Values
  coreValues = [
    {
      title: 'Faith',
      description:
        'Growing in our relationship with God through prayer, worship, and study.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Community',
      description:
        'Building meaningful relationships and supporting one another in our faith journey.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
    {
      title: 'Service',
      description:
        'Making a difference in our community through acts of love and compassion.',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    },
    {
      title: 'Growth',
      description:
        'Continuously learning and developing in our spiritual journey.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
  ];

  ngOnInit(): void {
    // Initialize any necessary data or services
  }
}
