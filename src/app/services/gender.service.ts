import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app.config.service';
import { HandleError } from '../common/handle-error';
import { catchError } from 'rxjs';
import { Gender } from '../models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  url: string = 'gender';

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError,
  ) {
    this.url = this.appConfig.getUrlBase() + this.url;
  }

  getAll() {
    return this.http.get<any>(this.url).pipe(
      catchError(this.handleError.handleError<any>('getAll'))
    );
  }

  set(data: Gender) {
    return this.http.post<any>(this.url, data).pipe(
      catchError(this.handleError.handleError<any>('set'))
    );
  }

  getById(genderId: number) {
    return this.http.get<any>(this.url + `/${ genderId }` ).pipe(
      catchError(this.handleError.handleError<any>('getById'))
    )
  }

  update(data: Gender, genderId: number) {
    return this.http.put<any>(this.url + `/${ genderId }`, data).pipe(
      catchError(this.handleError.handleError<any>('update'))
    );
  }

}
