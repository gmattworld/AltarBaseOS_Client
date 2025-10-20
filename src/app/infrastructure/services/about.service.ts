import { Injectable } from '@angular/core';
import { AboutModel } from '../../core/models/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  getAboutPageData(): import("rxjs").Observable<AboutModel | undefined> | import("rxjs").Subscribable<AboutModel | undefined> {
    throw new Error('Method not implemented.');
  }

  constructor() { }

}
