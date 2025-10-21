import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
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
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  private eventsService = inject(EventsService);

  public allEvents = signal<ChurchEvent[]>([]);
  public categories = signal<Category[]>([]);

  public selectedCategory: WritableSignal<string> = signal('all');

  private sortedEvents = computed(() => {
    const now = new Date();
    return this.allEvents() == undefined ? [] : this.allEvents()!
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  });

  public featuredEvent = computed(() => this.sortedEvents()[0]);

  private gridEvents = computed(() => this.sortedEvents().slice(1));

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

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe({
      next: (events: ChurchEvent[]) => {
        this.allEvents.set(events);
      }
    });
  }
}