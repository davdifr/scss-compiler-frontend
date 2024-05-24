import { Component, inject, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [],
  templateUrl: './download-file.component.html',
})
export class DownloadFileComponent {
  @Input({ required: true }) css: string = '';
  @Input({ required: true }) fileName: string = 'main.css';

  #renderer = inject(Renderer2);

  onClick() {
    const blob = this.createBlob();
    const url = this.createUrl(blob);
    this.downloadFile(url, this.fixFileName(this.fileName));
  }

  private createBlob() {
    return new Blob([this.css], { type: 'text/css' });
  }

  private createUrl(blob: Blob) {
    return URL.createObjectURL(blob);
  }

  private downloadFile(url: string, filename: string) {
    const a = this.#renderer.createElement('a');
    this.#renderer.setProperty(a, 'href', url);
    this.#renderer.setProperty(a, 'download', filename);
    this.#renderer.appendChild(document.body, a);
    a.click();
    this.#renderer.removeChild(document.body, a);
  }

  private fixFileName(fileName: string) {
    return fileName.replace(/\.scss$/, '.css');
  }
}
