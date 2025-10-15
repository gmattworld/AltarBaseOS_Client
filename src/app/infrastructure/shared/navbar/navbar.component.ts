import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Observable, map } from 'rxjs';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen = signal(false);
  isScrolled = signal(false);
  hoveredItem = signal<string | null>(null);
  isDarkMode = signal(false);

  churchName = environment.churchName;
  churchPhone = environment.churchPhone;
  churchEmail = environment.churchEmail;

  private readonly isBrowser: boolean;

  public navItems$: Observable<NavItem[]>;
  public isAuthenticated$: Observable<boolean>;

  private readonly publicNavItems: NavItem[] = [
    { path: '/home', label: 'Home', icon: 'home' },
    // { path: '/about', label: 'About', icon: 'info' },
    { path: '/services', label: 'Services', icon: 'church' },
    { path: '/events', label: 'Events', icon: 'calendar' },
    { path: '/ministries', label: 'Ministries', icon: 'people' },
    { path: '/giving', label: 'Giving', icon: 'money' },
    { path: '/account', label: 'Login', icon: 'login' },
  ];

  private readonly authenticatedNavItems: NavItem[] = [
    { path: '/app/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/app/profile', label: 'Profile', icon: 'user' },
    { path: '/app/giving', label: 'Giving', icon: 'money' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.isAuthenticated$ = this.authService.currentUser$.pipe(map(user => !!user));

    this.navItems$ = this.isAuthenticated$.pipe(
      map(isAuthenticated => isAuthenticated ? this.authenticatedNavItems : this.publicNavItems)
    );
  }

  ngOnInit() {
    if (this.isBrowser) {
      const savedDarkMode = this.localStorageService.getItem('darkMode');
      if (savedDarkMode) {
        this.isDarkMode.set(savedDarkMode === 'true');
        if (savedDarkMode === 'true') {
          document.documentElement.classList.add('dark');
        }
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        }
      }

      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 0);
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  setHoveredItem(item: string | null) {
    this.hoveredItem.set(item);
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
    this.localStorageService.setItem('darkMode', this.isDarkMode().toString());
    document.documentElement.classList.toggle('dark');
  }
}
