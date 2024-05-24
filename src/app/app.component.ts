import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UploadService } from './services/upload.service';
import { DownloadFileComponent } from './components/download-file/download-file.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, DownloadFileComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  #uploadService = inject(UploadService);

  files: File[] = [];
  mainFileName: string = '';
  response: string = '';

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.files = Array.from(target.files || []);

    const targetFiles = ['main.scss', 'style.scss'];

    if (this.files.length === 1) {
      this.mainFileName = this.files[0].name;
    } else {
      for (const file of this.files) {
        if (targetFiles.includes(file.name)) {
          this.mainFileName = file.name;
          break;
        }
      }
    }
  }

  onSubmit() {
    // Check if files are selected and main file is set
    if (this.files.length > 0 && this.mainFileName) {
      this.uploadFiles(this.files, this.mainFileName);
    }
  }

  private uploadFiles(files: File[], mainFile: string) {
    this.#uploadService.uploadFiles(files, mainFile).subscribe({
      next: (res: string) => {
        this.response = res;
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle error
      },
    });
  }
}
