import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  // Church Information
  churchName = environment.churchName;
  churchAddress = environment.churchAddress;
  churchCity = environment.churchCity;
  churchState = environment.churchState;
  churchZip = environment.churchZip;
  churchPhone = environment.churchPhone;
  churchEmail = environment.churchEmail;

  // Service Times
  serviceTimes = environment.serviceTimes;

  // Regular Services
  regularServices = [
    {
      title: 'Sunday Worship',
      time: '10:00 AM',
      description:
        'Join us for our main worship service featuring inspiring music, prayer, and a meaningful message.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      features: [
        'Contemporary Worship Music',
        "Children's Ministry",
        'Youth Programs',
        'Fellowship Time',
      ],
    },
    {
      title: 'Wednesday Bible Study',
      time: '7:00 PM',
      description:
        "Deep dive into God's Word with our weekly Bible study and discussion group.",
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      features: [
        'In-depth Bible Study',
        'Group Discussion',
        'Prayer Time',
        'Fellowship',
      ],
    },
  ];

  // Special Services
  specialServices = [
    {
      title: 'Baptism',
      description:
        'Celebrate new life in Christ through the sacrament of baptism.',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      details:
        'We offer baptism services throughout the year. Contact us to schedule a baptism or learn more about this important step in your faith journey.',
    },
    {
      title: 'Wedding Ceremonies',
      description: 'Celebrate your love in a beautiful, meaningful ceremony.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      details:
        'Our church provides a beautiful setting for your wedding ceremony. We offer pre-marital counseling and support throughout your planning process.',
    },
    {
      title: 'Funeral Services',
      description:
        'Honor your loved ones with a meaningful service of remembrance.',
      icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      details:
        'We provide compassionate support and beautiful funeral services to help you honor and remember your loved ones.',
    },
  ];

  // Ministry Programs
  ministryPrograms = [
    {
      title: "Children's Ministry",
      description:
        'Nurturing young hearts in faith through age-appropriate activities and teachings.',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      schedule: 'Sundays during worship service',
      ageGroup: 'Ages 2-12',
    },
    {
      title: 'Youth Ministry',
      description:
        'Engaging activities and discussions for teens to grow in their faith.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      schedule: 'Wednesdays at 6:00 PM',
      ageGroup: 'Ages 13-18',
    },
    {
      title: 'Adult Bible Study',
      description:
        'Deepen your understanding of Scripture through guided study and discussion.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      schedule: 'Various times throughout the week',
      ageGroup: 'Adults',
    },
  ];

  ngOnInit(): void {
    // Initialize any necessary data or services
  }
}
