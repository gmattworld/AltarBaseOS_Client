import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AboutService } from '../../../infrastructure/services/about.service';
import { AboutModel } from '../../../core/models/about.model';
import { BaseResponse } from '../../../core/models/base-response';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  // Inject the service that provides the page data.
  private aboutService = inject(AboutService);

  // Fetch all data for the page and convert the observable to a signal.
  // The template can now reactively display this data, including loading states.
  public pageData = signal<AboutModel | null>(null);

  ngOnInit(): void {
    this.aboutService.getAboutPageData().subscribe({
      next: (data: BaseResponse<AboutModel>) => {
        this.pageData.set(data.data);
      }
    });
  }
}