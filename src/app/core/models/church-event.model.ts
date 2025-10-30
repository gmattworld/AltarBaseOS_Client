export interface ChurchEvent {
  id: string|null;
  title: string;
  description?: string;
  eventStart: string;
  eventEnd?: string|null;
  isAllDay: boolean;
  locationName: string;
  locationAddress?: string;
  virtualEventUrl?: string;
  imageUrl?: string;
  registrationRequired: boolean;
  registrationUrl?: string;
  eventCategoryId: string;
}

export interface Category {
  id: string;
  name: string;
}
