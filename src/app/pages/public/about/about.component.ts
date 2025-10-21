import { ConfigService } from './../../../infrastructure/services/config.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutService } from '../../../infrastructure/services/about.service';
import { CoreValue, Milestone, TeamMember } from '../../../core/models/about.model';
import { BaseResponse } from '../../../core/models/base-response';
import { ConfigModel } from '../../../core/models/config.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  private aboutService = inject(AboutService);
  private configService = inject(ConfigService);

  public configData = signal<ConfigModel | null>(null);
  public milestones = signal<Milestone[]>([]);
  public teamMembers = signal<TeamMember[]>([]);
  public coreValues = signal<CoreValue[]>([]);
  ngOnInit(): void {
    this.configService.getConfig().subscribe({
      next: (response: BaseResponse<ConfigModel>) => {
        this.configData.set(response.data);
      }
    });
    // this.aboutService.getAboutPageData().subscribe({
    //   next: (data: BaseResponse<AboutModel>) => {
    //     this.pageData.set(data.data);
    //   }
    // });
  }
}