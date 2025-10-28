import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutService } from '../../../infrastructure/services/about.service';
import { CoreValue, Milestone, TeamMember } from '../../../core/models/about.model';
import { BaseResponse, BaseResponseExt } from '../../../core/models/base-response';
import { ConfigModel } from '../../../core/models/config.model';
import { CommonService } from '../../../infrastructure/services/common.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  private commonService = inject(CommonService);

  public configData = signal<ConfigModel | null>(null);
  public milestones = signal<Milestone[]>([]);
  public teamMembers = signal<TeamMember[]>([]);
  public coreValues = signal<CoreValue[]>([]);
  ngOnInit(): void {
    this.commonService.getConfig().subscribe({
      next: (response: BaseResponse<ConfigModel>) => {
        this.configData.set(response.data);
      }
    });
    this.commonService.getMilestones().subscribe({
      next: (data: BaseResponseExt<Milestone>) => {
        this.milestones.set(data.data);
      }
    });
    this.commonService.getTeamMembers().subscribe({
      next: (data: BaseResponseExt<TeamMember>) => {
        this.teamMembers.set(data.data);
      }
    });
  }
}