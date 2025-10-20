import { LocalStorageService } from './local-storage.service';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, shareReplay, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../core/models/base-response';
import { ConfigModel } from '../../core/models/config.model';


@Injectable({ providedIn: 'root' })
export class ConfigService {
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
    if (this.cachedResponse) {
      return of(this.cachedResponse);
    }

    if (this.request$) {
      return this.request$;
    }

    try {
      const raw = this.localStorageService.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as BaseResponse<ConfigModel>;
        if (parsed) {
          this.cachedResponse = parsed;
          return of(parsed);
        }
      }
    } catch (err) {
      console.warn('Failed to parse stored config, will fetch from API', err);
    }

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

  clearConfig(): void {
    this.cachedResponse = undefined;
    this.request$ = undefined;
    this.localStorageService.removeItem(this.storageKey);
  }
}
