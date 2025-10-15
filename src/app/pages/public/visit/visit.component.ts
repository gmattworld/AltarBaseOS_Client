import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
})
export class VisitComponent implements OnInit {
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

  // What to Expect
  whatToExpect = [
    {
      title: 'Warm Welcome',
      description:
        'Our greeters will welcome you with a smile and help you find your way around.',
      icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
    },
    {
      title: 'Casual Dress',
      description:
        'Come as you are. We welcome everyone regardless of their attire.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      title: 'Children Welcome',
      description: "We have a safe and fun children's ministry for all ages.",
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
  ];

  // Directions
  directions = [
    {
      title: 'From North',
      description:
        'Take I-95 South to Exit 123. Turn right onto Main Street and continue for 2 miles.',
      icon: 'M5 15l7-7 7 7',
    },
    {
      title: 'From South',
      description:
        'Take I-95 North to Exit 123. Turn left onto Main Street and continue for 2 miles.',
      icon: 'M19 9l-7 7-7-7',
    },
    {
      title: 'From East',
      description:
        'Take Route 50 West to Main Street. Turn right and continue for 1 mile.',
      icon: 'M15 19l-7-7 7-7',
    },
    {
      title: 'From West',
      description:
        'Take Route 50 East to Main Street. Turn left and continue for 1 mile.',
      icon: 'M9 5l7 7-7 7',
    },
  ];

  ngOnInit(): void {
    // Initialize any necessary data or services
  }
}
