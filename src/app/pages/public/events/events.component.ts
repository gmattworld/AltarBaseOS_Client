import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// In a real app, this service would fetch events from a database.
import { EventsService } from '../../../infrastructure/services/events.service';
import { toSignal } from '@angular/core/rxjs-interop';

// --- Data Models for Type Safety ---
interface ChurchEvent {
  title: string;
  date: Date; // Using Date objects is more robust than strings
  time: string;
  location: string;
  description: string;
  category: 'Outreach' | 'Youth' | 'Family' | 'Fellowship';
  image: string;
  registrationRequired: boolean;
}

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  // --- Service Injection & Data Fetching ---
  private eventsService = inject(EventsService);

  // Fetch all events and categories and convert them to signals.
  public allEvents = toSignal<ChurchEvent[]>(this.eventsService.getEvents());
  public categories = toSignal<Category[]>(this.eventsService.getCategories());

  // --- State Management with Signals ---
  public selectedCategory: WritableSignal<string> = signal('all');

  // --- Computed Signals for Derived State ---
  // A signal that holds all events sorted by date.
  private sortedEvents = computed(() => {
    const now = new Date();
    // Filter out past events and sort the remaining ones by date.
    return this.allEvents() == undefined ? [] : this.allEvents()!
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  });

  // A signal for the single "featured" event (the next one coming up).
  public featuredEvent = computed(() => this.sortedEvents()[0]);

  // A signal for the grid of other upcoming events (all except the featured one).
  private gridEvents = computed(() => this.sortedEvents().slice(1));

  // A signal that filters the grid events based on the selected category.
  public filteredGridEvents = computed(() => {
    const category = this.selectedCategory();
    const events = this.gridEvents();
    if (category === 'all') {
      return events;
    }
    return events.filter(event => event.category.toLowerCase() === category);
  });

  // --- Methods ---
  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  // A simple method to format dates, now accepting a Date object.
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}