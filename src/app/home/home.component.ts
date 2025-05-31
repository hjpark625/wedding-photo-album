import { Component, inject } from '@angular/core';
import { PhotoRequestService } from '@/apis/photo-request.service';

import type { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private photoRequestService = inject(PhotoRequestService);

  saveAttachImages(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const target = event.target;
      const files = Array.from(target.files || []);
      this.uploadPhotos(files);
    }
  }

  uploadPhotos(images: File[]) {
    if (images.length === 0) return;

    this.photoRequestService.uploadPhotos(images).subscribe({
      next: (response) => {
        console.log('Upload successful:', response.imageUrls);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
