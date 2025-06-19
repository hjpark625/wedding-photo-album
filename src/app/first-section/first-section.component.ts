import { Component, output, viewChild } from '@angular/core';

import type { ElementRef } from '@angular/core';

@Component({
  selector: 'first-section',
  templateUrl: './first-section.component.html',
  styleUrl: './first-section.component.scss'
})
export class FirstSectionComponent {
  readonly imageUploadInput = viewChild<ElementRef<HTMLInputElement>>('imageUploadInput');

  readonly uploadPhotoTrigger = output<FormData>();

  saveAttachImages(event: Event) {
    const formData = new FormData();
    if (event.target instanceof HTMLInputElement) {
      const target = event.target;
      const files = Array.from(target.files || []);
      if (files.length === 0) return;

      files.forEach((file) => {
        formData.append('images', file);
      });
      //   this.uploadPhotos(formData);
      this.uploadPhotoTrigger.emit(formData);
    }
  }

  onInputTrigger(e: Event) {
    e.preventDefault();

    const inputElement = this.imageUploadInput();

    if (!inputElement) return;
    inputElement.nativeElement.click();
  }
}
