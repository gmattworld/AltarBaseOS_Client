export interface Milestone {
  id: string;
  milestoneDate: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}