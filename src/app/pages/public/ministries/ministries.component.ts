import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ministries',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ministries.component.html',
  styleUrl: './ministries.component.scss',
})
export class MinistriesComponent implements OnInit {
  // Ministry Categories
  categories = [
    { id: 'all', name: 'All Ministries' },
    { id: 'children', name: 'Children' },
    { id: 'youth', name: 'Youth' },
    { id: 'adults', name: 'Adults' },
    { id: 'outreach', name: 'Outreach' },
  ];

  selectedCategory = 'all';

  // Ministries
  ministries = [
    {
      title: "Children's Ministry",
      category: 'children',
      description:
        'Nurturing young hearts in faith through age-appropriate activities and teachings.',
      image: 'assets/images/ministries/children.jpg',
      schedule: 'Sundays during worship service',
      ageGroup: 'Ages 2-12',
      features: [
        'Sunday School Classes',
        'Vacation Bible School',
        "Children's Choir",
        'Special Events',
      ],
    },
    {
      title: 'Youth Ministry',
      category: 'youth',
      description:
        'Engaging activities and discussions for teens to grow in their faith.',
      image: 'assets/images/ministries/youth.jpg',
      schedule: 'Wednesdays at 6:00 PM',
      ageGroup: 'Ages 13-18',
      features: [
        'Bible Study',
        'Youth Group Meetings',
        'Community Service',
        'Social Events',
      ],
    },
    {
      title: 'Adult Bible Study',
      category: 'adults',
      description:
        'Deepen your understanding of Scripture through guided study and discussion.',
      image: 'assets/images/ministries/bible-study.jpg',
      schedule: 'Various times throughout the week',
      ageGroup: 'Adults',
      features: [
        'Weekly Bible Study',
        'Small Groups',
        'Prayer Meetings',
        'Fellowship Events',
      ],
    },
    {
      title: 'Community Outreach',
      category: 'outreach',
      description:
        'Making a difference in our community through acts of love and compassion.',
      image: 'assets/images/ministries/outreach.jpg',
      schedule: 'Monthly events',
      ageGroup: 'All Ages',
      features: [
        'Food Bank',
        'Homeless Ministry',
        'Community Events',
        'Mission Trips',
      ],
    },
    {
      title: 'Worship Ministry',
      category: 'adults',
      description:
        'Leading the congregation in worship through music and praise.',
      image: 'assets/images/ministries/worship.jpg',
      schedule: 'Weekly rehearsals and services',
      ageGroup: 'Teens and Adults',
      features: [
        'Choir',
        'Praise Band',
        'Special Music',
        'Worship Planning',
      ] as string[],
    },
    {
      title: 'Senior Ministry',
      category: 'adults',
      description: 'Fellowship and activities designed for our senior members.',
      image: 'assets/images/ministries/seniors.jpg',
      schedule: 'Monthly gatherings',
      ageGroup: 'Seniors',
      features: [
        'Fellowship Lunches',
        'Bible Study',
        'Day Trips',
        'Special Events',
      ] as string[],
    },
  ];

  // Filter ministries by category
  get filteredMinistries() {
    if (this.selectedCategory === 'all') {
      return this.ministries;
    }
    return this.ministries.filter(
      (ministry) =>
        ministry.category.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  ngOnInit(): void {
    // Initialize any necessary data or services
  }
}
