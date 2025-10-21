import { Injectable } from '@angular/core';
import { AboutModel } from '../../core/models/about.model';
import { BaseResponse } from '../../core/models/base-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiBaseUrl = `${environment.API_BASE_URL}/v1`;

  constructor(private http: HttpClient) { }


  getAboutPageData(): Observable<BaseResponse<AboutModel>> {
    return this.http.get<BaseResponse<AboutModel>>(`${this.apiBaseUrl}/apps/about`);
  }
}
