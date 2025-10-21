import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SermonsService {
getSermons(): import("rxjs").Observable<import("../../pages/public/sermons/sermons.component").Sermon[]> | import("rxjs").Subscribable<import("../../pages/public/sermons/sermons.component").Sermon[]> {
  throw new Error('Method not implemented.');
}

constructor() { }

}
