import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  // #http = inject(HttpClient);

  private API_URL = 'https://scss-compiler.vercel.app/api/compile-scss';

  constructor(private httpClient: HttpClient) {}

  uploadFiles(files: File[], mainFile: string): Observable<string> {
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    formData.append('main', mainFile);

    return this.httpClient.post(this.API_URL, formData, {
      responseType: 'text',
    });
  }
}
