import { Component, computed, effect, inject, Renderer2, signal, PLATFORM_ID, Inject, WritableSignal, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConfigService } from '../../services/config.service';
import { ConfigModel } from '../../../core/models/config.model';

// --- Data Models for clarity ---
interface NavItem {
  path: string;
  label: string;
}

interface SocialLink {
  url: string;
  name: string;
  svgPath: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // --- Service Injection ---
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  private configService = inject(ConfigService);
 

  // --- State Management with Signals ---
  public isMenuOpen = signal(false);
  public isScrolled = signal(false);
  public hoveredItem = signal<string | null>(null);
  public isDarkMode: WritableSignal<boolean>;

  // Convert observables to signals for a consistent, reactive state
  public configData = signal<ConfigModel | null>(null);
  public isAuthenticated = signal(false);

  // Navigation items are now a computed signal that reacts to authentication changes
  public navItems = computed<NavItem[]>(() =>
    this.isAuthenticated()
      ? [ // Authenticated Routes
          { path: '/app/dashboard', label: 'Dashboard' },
          { path: '/app/profile', label: 'Profile' },
          { path: '/app/giving', label: 'Giving History' },
        ]
      : [ // Public Routes
          { path: '/home', label: 'Home' },
          { path: '/about', label: 'About Us' },
          { path: '/sermons', label: 'Sermons' },
          { path: '/events', label: 'Events' },
          { path: '/contact', label: 'Connect' },
        ]
  );
  
  // Social links are now dynamic
  public socialLinks = signal<SocialLink[]>([
      { url: 'https://facebook.com', name: 'Facebook', svgPath: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
      { url: 'https://youtube.com', name: 'YouTube', svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
  ]);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object, @Inject(DOCUMENT) private document: Document) {
    // Initialize dark mode signal based on stored preference or system setting (SSR-safe)
    if (isPlatformBrowser(this.platformId)) {
        const savedMode = this.localStorageService.getItem('darkMode') === 'true';
        this.isDarkMode = signal(savedMode);
    } else {
        this.isDarkMode = signal(false); // Default for server
    }

    // Effect for handling side effects like DOM manipulation (SSR-safe)
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        // Handle dark mode class on document element
        if (this.isDarkMode()) {
          this.renderer.addClass(this.document.documentElement, 'dark');
        } else {
          this.renderer.removeClass(this.document.documentElement, 'dark');
        }
        // Save preference to local storage
        this.localStorageService.setItem('darkMode', this.isDarkMode().toString());

        // Handle scroll event listener
        const scrollSubscription = fromEvent(window, 'scroll').subscribe(() => {
          this.isScrolled.set(window.scrollY > 0);
        });
        // Cleanup subscription automatically when effect is destroyed
        return () => scrollSubscription.unsubscribe();
      });
    };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

  toggleMenu() { this.isMenuOpen.update(v => !v); }
  closeMenu() { this.isMenuOpen.set(false); }
  setHoveredItem(item: string | null) { this.hoveredItem.set(item); }
  toggleDarkMode() { this.isDarkMode.update(v => !v); }


  ngOnInit() {
    this.configService.getConfig().subscribe(config => {
      this.configData.set(config.data ?? null);
    });
  }
}