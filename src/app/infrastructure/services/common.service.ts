import { Injectable } from '@angular/core';
import { BaseResponse, BaseResponseExt } from '../../core/models/base-response';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigModel } from '../../core/models/config.model';
import { LocalStorageService } from './local-storage.service';
import { Milestone, TeamMember } from '../../core/models/about.model';
import { Category, ChurchEvent } from '../../core/models/church-event.model';
import { Sermon } from '../../core/models/sermon';
import { ChurchService } from '../../core/models/church-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly storageKey = 'app_config_v1';
  private cachedResponse?: BaseResponse<ConfigModel>;
  private request$?: Observable<BaseResponse<ConfigModel>>;
  private apiBaseUrl = `${environment.API_BASE_URL}/v1`;

  constructor(
    private http: HttpClient, private localStorageService: LocalStorageService
  ) {
    try {
      const raw = this.localStorageService.getItem(this.storageKey);
      if (raw) {
        this.cachedResponse = JSON.parse(raw) as BaseResponse<ConfigModel>;
      }
    } catch (err) {
      this.cachedResponse = undefined;
    }
  }

  getConfig(): Observable<BaseResponse<ConfigModel>> {
    // if (this.cachedResponse) {
    //   return of(this.cachedResponse);
    // }

    // if (this.request$) {
    //   return this.request$;
    // }

    // try {
    //   const raw = this.localStorageService.getItem(this.storageKey);
    //   if (raw) {
    //     const parsed = JSON.parse(raw) as BaseResponse<ConfigModel>;
    //     if (parsed) {
    //       this.cachedResponse = parsed;
    //       return of(parsed);
    //     }
    //   }
    // } catch (err) {
    //   console.warn('Failed to parse stored config, will fetch from API', err);
    // }

    return this.http
      .get<BaseResponse<ConfigModel>>(`${this.apiBaseUrl}/apps/config`)
      .pipe(
        map((response) => {
          console.log('Config fetched from API:', response);
          if (response.success) {
            this.localStorageService.setItem(this.storageKey, JSON.stringify(response));
          }
          return response;
        }),
        shareReplay(1),
        catchError(err => {
          this.request$ = undefined;
          return throwError(() => err);
        })
      );
  }

  getMilestones(): Observable<BaseResponseExt<Milestone>>{
    return this.http
      .get<BaseResponseExt<Milestone>>(`${this.apiBaseUrl}/apps/milestones`)
      .pipe(
        map((response) => {
          // console.log('Config fetched from API:', response);
          // if (response.success) {
          //   this.localStorageService.setItem(this.storageKey, JSON.stringify(response));
          // }
          return response;
        }),
        shareReplay(1),
        catchError(err => {
          this.request$ = undefined;
          return throwError(() => err);
        })
      );
  }

  getTeamMembers(): Observable<BaseResponseExt<TeamMember>>{
    return this.http
      .get<BaseResponseExt<TeamMember>>(`${this.apiBaseUrl}/apps/teams`)
      .pipe(
        map((response) => {
          // console.log('Config fetched from API:', response);
          // if (response.success) {
          //   this.localStorageService.setItem(this.storageKey, JSON.stringify(response));
          // }
          return response;
        }),
        shareReplay(1),
        catchError(err => {
          this.request$ = undefined;
          return throwError(() => err);
        })
      );
  }


  getEventCategories(): Observable<BaseResponseExt<Category>> {
    return this.http
      .get<BaseResponseExt<Category>>(`${this.apiBaseUrl}/apps/categories`)
      .pipe(
        map((response) => {
          // console.log('Config fetched from API:', response);
          // if (response.success) {
          //   this.localStorageService.setItem(this.storageKey, JSON.stringify(response));
          // }
          return response;
        }),
        shareReplay(1),
        catchError(err => {
          this.request$ = undefined;
          return throwError(() => err);
        })
      );
  }
  getEvents(): Observable<BaseResponseExt<ChurchEvent>> {
    return this.http
      .get<BaseResponseExt<ChurchEvent>>(`${this.apiBaseUrl}/apps/events`)
      .pipe(
        map((response) => {
          // console.log('Config fetched from API:', response);
          // if (response.success) {
          //   this.localStorageService.setItem(this.storageKey, JSON.stringify(response));
          // }
          return response;
        }),
        shareReplay(1),
        catchError(err => {
          this.request$ = undefined;
          return throwError(() => err);
        })
      );
  }

  getSermons(): Observable<BaseResponseExt<Sermon>> {
    return this.http
      .get<BaseResponseExt<Sermon>>(`${this.apiBaseUrl}/apps/resources`)
      .pipe(
        map((response) => {
          // console.log('Config fetched from API:', response);
          // if (response.success) {
          //   this.localStorageService.setItem(this.storageKey, JSON.stringify(response));
          // }
          return response;
        }),
        shareReplay(1),
        catchError(err => {
          this.request$ = undefined;
          return throwError(() => err);
        })
      );
  }

  getChurchServices(): Observable<BaseResponseExt<ChurchService>> {
    return this.http
      .get<BaseResponseExt<ChurchService>>(`${this.apiBaseUrl}/apps/church-services`)
      .pipe(
        map((response) => {
          // console.log('Config fetched from API:', response);
          // if (response.success) {
          //   this.localStorageService.setItem(this.storageKey, JSON.stringify(response));
          // }
          return response;
        }),
        shareReplay(1),
        catchError(err => {
          this.request$ = undefined;
          return throwError(() => err);
        })
      );
  }

  clearConfig(): void {
    this.cachedResponse = undefined;
    this.request$ = undefined;
    this.localStorageService.removeItem(this.storageKey);
  }
}
