import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonService } from '../../../infrastructure/services/common.service';
import { BaseResponseExt } from '../../../core/models/base-response';
import { Category, ChurchEvent } from '../../../core/models/church-event.model'; 
import { map } from 'rxjs';

interface ChurchEventViewModel extends Omit<ChurchEvent, 'eventStart' | 'eventEnd'> {
  eventStart: Date;
  eventEnd: Date | null;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  private commonService = inject(CommonService);

  public isLoading = signal(true);
  public allEvents = signal<ChurchEventViewModel[]>([]);
  public categories = signal<Category[]>([]);
  public selectedCategory: WritableSignal<string> = signal('all');

  private sortedEvents = computed(() => {
    const now = new Date();
    if (!this.allEvents().length) {
        return [];
    }
    return this.allEvents()
      .filter(event => event.eventStart >= now)
      .sort((a, b) => a.eventStart.getTime() - b.eventStart.getTime());
  });

  public featuredEvent = computed(() => this.sortedEvents()[0]);

  private gridEvents = computed(() => this.sortedEvents().slice(1));

  public filteredGridEvents = computed(() => {
    const category = this.selectedCategory();
    const events = this.gridEvents();
    if (category === 'all') {
      return events;
    }
    // Updated to use eventCategoryId
    return events.filter(event => event.eventCategoryId === category);
  });

  // --- Methods ---
  
  ngOnInit(): void {
    this.loadEvents();
    this.loadCategories();
  }

  loadEvents(): void {
    this.isLoading.set(true);
    this.commonService.getEvents().pipe(
      map((resp: BaseResponseExt<ChurchEvent>) => {
        return resp.data.map(event => ({
          ...event,
          eventStart: new Date(event.eventStart),
          eventEnd: event.eventEnd ? new Date(event.eventEnd) : null
        }));
      }),
    ).subscribe({
      next: (viewModels: ChurchEventViewModel[]) => {
        this.allEvents.set(viewModels);
        this.isLoading.set(false);
      }
    });
  }

  loadCategories(): void {
    this.commonService.getEventCategories().subscribe({
      next: (resp: BaseResponseExt<Category>) => {
        const allCategory: Category = { id: 'all', name: 'All Events' };
        this.categories.set([allCategory, ...resp.data]);
      }
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  // Helper to get category name from ID
  getCategoryName(id: string): string {
    return this.categories().find(c => c.id === id)?.name || 'General';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  // New helper to format time
  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
  }
}