export interface RoadmapMilestone {
  title: string;
  description: string;
  isActive?: boolean;
  status: 'completed' | 'current' | 'upcoming';
}

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    title: "March'25",
    description: 'Base components',
    status: 'completed',
  },
  {
    title: "April'25",
    description: 'v.1.1',
    status: 'completed',
  },
  {
    title: "Mid-April'25",
    description: 'v.1.2',
    status: 'completed',
  },
  {
    title: "June'25",
    description: 'Component name',
    status: 'completed',
  },
  {
    title: "July'25",
    description: 'Component name',
    status: 'current',
    isActive: true,
  },
  {
    title: "September'25",
    description: 'Component name',
    status: 'upcoming',
  },
];
