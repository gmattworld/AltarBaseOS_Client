import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
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

  // Social Links
  socialLinks = [
    { name: 'Facebook', url: environment.facebookUrl, icon: 'facebook' },
    { name: 'Instagram', url: environment.instagramUrl, icon: 'instagram' },
    { name: 'YouTube', url: environment.youtubeUrl, icon: 'youtube' },
  ];

  // Quick Links
  quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/events', label: 'Events' },
    { path: '/ministries', label: 'Ministries' },
    { path: '/contact', label: 'Contact' },
  ];

  // Dark Mode Signal
  isDarkMode = signal(false);

  currentYear = new Date().getFullYear();

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object, private localStorageService: LocalStorageService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Check for saved dark mode preference
    const savedDarkMode = this.localStorageService.getItem('darkMode');
    if (savedDarkMode) {
      this.isDarkMode.set(savedDarkMode === 'true');
    } else {
      // Check system preference
      this.isDarkMode.set(
        this.isBrowser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
      );
    }
  }

  toggleDarkMode() {
    this.isDarkMode.update((value) => !value);
    this.localStorageService.setItem('darkMode', this.isDarkMode().toString());
    document.documentElement.classList.toggle('dark');
  }
}
