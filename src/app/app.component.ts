import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadService } from './services/upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { last } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  #uploadService = inject(UploadService);

  files: File[] = [];
  mainFileName: string = '';
  progress: number | null = null;
  response: string | null = null;

  onFileChange(event: any): void {
    this.files = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.files.length > 0 && this.mainFileName) {
      this.#uploadService
        .uploadFiles(this.files, this.mainFileName)
        .pipe(last())
        .subscribe(
          // (event: any) => {
          //   this.response = event.body;
          //   console.log('Upload event:', event.body);
          // },
          // (error) => {
          //   console.error('Upload error:', error);
          // }
          {
            next: (event: any) => {
              console.log('Received event:', event);
              this.response = event;
              // if (event.type === HttpEventType.Response) {
              //   this.response = event.body;
              //   console.log('Server response:', this.response);
              // }
            },
            error: (error: HttpErrorResponse) => {
              console.error('Upload error:', error);
            },
            complete: () => {
              console.log('Upload complete');
            },
          }
        );
    } else {
      alert('Please select files and specify the main file.');
    }
  }
}
