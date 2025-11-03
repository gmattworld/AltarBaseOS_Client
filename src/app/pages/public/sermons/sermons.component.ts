import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs'; // Import finalize
import { BaseResponseExt } from '../../../core/models/base-response';
import { CommonService } from '../../../infrastructure/services/common.service';

// --- Data Models for Type Safety ---
export interface Sermon {
  id: string;
  title: string;
  description: string;
  date: Date;
  speaker: string;
  series: string;
  videoId: string; // YouTube Video ID
  thumbnailUrl: string;
}

@Component({
  selector: 'app-sermons',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.css'],
})
export class SermonsComponent implements OnInit {
  private commonService = inject(CommonService);
  
  // State Signals
  public allSermons = signal<Sermon[]>([]);
  public isLoadingInitialData: WritableSignal<boolean> = signal(true); // NEW loading signal

  // Filter Signals
  public searchTerm: WritableSignal<string> = signal('');
  public selectedSeries: WritableSignal<string> = signal('all');
  public selectedSpeaker: WritableSignal<string> = signal('all');

  // Computed Values

  // Sorts all sermons by date (most recent first).
  private sortedSermons = computed(() => {
    // Ensure allSermons() is not null/undefined before accessing length
    const sermons = this.allSermons() || []; 
    return sermons.sort((a, b) => b.date.getTime() - a.date.getTime());
  });

  // A signal for the single "latest" sermon.
  public latestSermon = computed(() => this.sortedSermons()[0]);

  // A signal for the archive of sermons (all except the latest).
  private archiveSermons = computed(() => this.sortedSermons().slice(1));

  // A signal that filters the archive based on all filter criteria.
  public filteredArchiveSermons = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const series = this.selectedSeries();
    const speaker = this.selectedSpeaker();
    const archive = this.archiveSermons();

    return archive.filter(sermon => {
      const matchesSearch = term === '' || sermon.title.toLowerCase().includes(term) || sermon.speaker.toLowerCase().includes(term);
      const matchesSeries = series === 'all' || sermon.series === series;
      const matchesSpeaker = speaker === 'all' || sermon.speaker === speaker;
      return matchesSearch && matchesSeries && matchesSpeaker;
    });
  });

  // Unique lists for filter dropdowns
  public uniqueSeries = computed(() => {
    const seriesList = this.allSermons().map(s => s.series);
    return ['all', ...new Set(seriesList)];
  });
  public uniqueSpeakers = computed(() => {
    const speakerList = this.allSermons().map(s => s.speaker);
    return ['all', ...new Set(speakerList)];
  });

  // --- Methods ---
  public onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  public onSeriesChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSeries.set(selectElement.value);
  }

  public onSpeakerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSpeaker.set(selectElement.value);
  }

  public getYouTubeEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }


  ngOnInit(): void {
    this.isLoadingInitialData.set(true);
    this.commonService.getSermons().subscribe({
      next: (sermons: BaseResponseExt<Sermon>) => {
        this.isLoadingInitialData.set(false)
        // Ensure date fields are correctly converted to Date objects
        const processedSermons = sermons.data.map(s => ({
            ...s,
            date: s.date instanceof Date ? s.date : new Date(s.date)
        }));
        this.allSermons.set(processedSermons);
        
      }, 
      error: (err: any) => {
        this.isLoadingInitialData.set(false)
        console.error('Failed to load sermons:', err);
        this.allSermons.set([]); // Set to empty array on error
      }
    });
  }
}