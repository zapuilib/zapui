import { Component } from '@angular/core';
import { ROADMAP_MILESTONES, RoadmapMilestone } from '../../../../constants/roadmap.constant';

@Component({
  selector: 'app-roadmap',
  imports: [],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
})
export class RoadmapComponent {
  milestones: RoadmapMilestone[] = ROADMAP_MILESTONES;
}
