import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private API_URL = 'https://scss-compiler.vercel.app/api/compile-scss';

  constructor(private httpClient: HttpClient) {}

  uploadFiles(files: File[], mainFile: string): Observable<any> {
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    formData.append('main', mainFile);

    return this.httpClient
      .post(this.API_URL, formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (!event.total) {
                return { status: 'progress', message: 0 };
              }
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error.message || 'Server error');
        })
      );
  }
}
