import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadService } from './upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: File[] = [];
  mainFileName: string = '';
  progress: number | null = null;
  response: string | null = null;

  constructor(private uploadService: UploadService) {}

  onFileChange(event: any): void {
    this.files = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.files.length > 0 && this.mainFileName) {
      this.uploadService.uploadFiles(this.files, this.mainFileName).subscribe(
        (event: any) => {
          if (event.status === 'progress') {
            this.progress = event.message;
          } else {
            this.response = event;
            this.progress = null;
          }
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    } else {
      alert('Please select files and specify the main file.');
    }
  }
}
