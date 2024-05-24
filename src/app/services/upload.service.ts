import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private API_URL = 'https://scss-compiler.vercel.app/api/compile-scss';

  #http = inject(HttpClient);

  uploadFiles(files: File[], mainFile: string): Observable<string> {
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    formData.append('main', mainFile);

    return this.#http.post(this.API_URL, formData, {
      responseType: 'text',
    });
  }
}
