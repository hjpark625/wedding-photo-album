import { Component, inject } from '@angular/core';
import { PhotoRequestService } from '@/apis/photo-request.service';

import type { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private photoRequestService = inject(PhotoRequestService);
  private formData = new FormData();

  saveAttachImages(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const target = event.target;
      const files = Array.from(target.files || []);
      if (files.length === 0) return;

      files.forEach((file) => {
        this.formData.append('images', file);
      });
      this.uploadPhotos();
    }
  }

  uploadPhotos() {
    this.photoRequestService.uploadPhotos(this.formData).subscribe({
      // TODO: 응답 및 에러에 관련된 핸들링 추가 필요
      next: (response) => {
        console.log('Upload successful:', response.imageUrls);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
