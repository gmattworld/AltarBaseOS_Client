import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../infrastructure/services/config.service';
import { ConfigModel } from '../../../core/models/config.model';
import { CommonService } from '../../services/common.service';

// --- Data Models for clarity ---
interface Link {
  path: string;
  label: string;
}

interface ServiceTime {
  day: string;
  time: string;
  type: string;
}

interface SocialLink {
  url: string;
  name: string;
  svgPath: string; // Cleaner way to handle icons
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  private commonService = inject(CommonService);

  public configData = signal<ConfigModel | null>(null);

  public readonly currentYear = signal(new Date().getFullYear());

  public quickLinks = signal<Link[]>([
    { path: '/about', label: 'About Us' },
    { path: '/sermons', label: 'Sermons' },
    { path: '/events', label: 'Events' },
    { path: '/connect', label: 'Connect' },
    { path: '/give', label: 'Give Online' },
  ]);

  public weeklySchedule = signal<ServiceTime[]>([
    { day: 'Sunday', time: "9:00 AM", type: 'Celebration Service' },
    { day: 'Sunday', time: "6:00 PM", type: 'Thanksgiving Service' },
    { day: 'Tuesday', time: "7:00 PM", type: 'Digging Deep' },
    { day: 'Thursday', time: "7:00 PM", type: 'Faith Clinic' },
  ]);

  public socialLinks = signal<SocialLink[]>([
    {
      url: 'https://facebook.com',
      name: 'Facebook',
      svgPath: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
    },
    {
      url: 'https://youtube.com',
      name: 'YouTube',
      svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
    },
    {
      url: 'https://instagram.com',
      name: 'Instagram',
      svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.359-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.359-2.618-6.78-6.98-6.98C15.667 0 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.302a4.14 4.14 0 110-8.28 4.14 4.14 0 010 8.28zm4.965-9.298a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z'
    }
  ]);


  ngOnInit() {
    this.commonService.getConfig().subscribe(config => {
      this.configData.set(config.data);
    });
  }
}