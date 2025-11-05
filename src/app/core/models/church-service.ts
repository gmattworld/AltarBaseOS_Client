import { DayOfWeek } from "../enums/day_of_week.enum";

export interface ChurchService {
  id: string|null;
  name: string;
  dayOfWeek: DayOfWeek;
  description?: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress?: string;
}
