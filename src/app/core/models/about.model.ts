export interface AboutModel {
    history: History;
  leadershipTeam: TeamMember[];
  coreValues: CoreValue[];
} 

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface History {
  foundedYear: string;
  description: string;
  milestones: Milestone[];
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface CoreValue {
  title: string;
  description: string;
  icon: string;
}