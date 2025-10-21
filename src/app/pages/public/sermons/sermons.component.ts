import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SermonsService } from '../../../infrastructure/services/sermons.service';
import { SafePipe } from '../../../infrastructure/pipes/safe.pipe';

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
  imports: [CommonModule, RouterModule, SafePipe],
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.css'],
})
export class SermonsComponent implements OnInit {
  private sermonsService = inject(SermonsService);
  public allSermons = signal<Sermon[]>([]);
  
  public searchTerm: WritableSignal<string> = signal('');
  public selectedSeries: WritableSignal<string> = signal('all');
  public selectedSpeaker: WritableSignal<string> = signal('all');

  private sortedSermons = computed(() => {
    return this.allSermons()!.sort((a, b) => b.date.getTime() - a.date.getTime());
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
  public uniqueSeries = computed(() => ['all', ...new Set(this.allSermons()!.map(s => s.series))]);
  public uniqueSpeakers = computed(() => ['all', ...new Set(this.allSermons()!.map(s => s.speaker))]);

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
    this.sermonsService.getSermons().subscribe({
      next: (sermons: Sermon[]) => {
        this.allSermons.set(sermons);
      }
    });
  }
}