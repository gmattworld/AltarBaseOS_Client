import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AboutService } from '../../../infrastructure/services/about.service';
import { AboutModel } from '../../../core/models/about.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  // Inject the service that provides the page data.
  private aboutService = inject(AboutService);

  // Fetch all data for the page and convert the observable to a signal.
  // The template can now reactively display this data, including loading states.
  public pageData = toSignal<AboutModel | undefined>(
    this.aboutService.getAboutPageData()
  );
}