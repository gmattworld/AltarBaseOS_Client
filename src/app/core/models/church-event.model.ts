export interface ChurchEvent {
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  category: 'Outreach' | 'Youth' | 'Family' | 'Fellowship';
  image: string;
  registrationRequired: boolean;
}

export interface Category {
  id: string;
  name: string;
}
