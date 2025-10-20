import { Injectable } from '@angular/core';
import { Category, ChurchEvent } from '../../core/models/church-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
getCategories(): import("rxjs").Observable<Category[]> | import("rxjs").Subscribable<Category[]> {
  throw new Error('Method not implemented.');
}
getEvents(): import("rxjs").Observable<ChurchEvent[]> | import("rxjs").Subscribable<ChurchEvent[]> {
  throw new Error('Method not implemented.');
}

constructor() { }

}
