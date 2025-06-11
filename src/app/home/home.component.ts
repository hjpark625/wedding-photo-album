import { Component, inject, viewChild } from '@angular/core';

import { PhotoRequestService } from '@/apis/photo-request.service';
import { AuthRequestService } from '@/apis/auth-request.service';

import type { HttpErrorResponse } from '@angular/common/http';
import type { ElementRef, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private photoRequestService = inject(PhotoRequestService);
  private authRequestService = inject(AuthRequestService);

  // TODO: CSRF 토큰 저장 및 관리 방식 고민 필요
  private csrfToken = '';

  readonly imageUploadInput = viewChild<ElementRef<HTMLInputElement>>('imageUploadInput');

  saveAttachImages(event: Event) {
    const formData = new FormData();
    if (event.target instanceof HTMLInputElement) {
      const target = event.target;
      const files = Array.from(target.files || []);
      if (files.length === 0) return;

      files.forEach((file) => {
        formData.append('images', file);
      });
      this.uploadPhotos(formData);
    }
  }

  onInputTrigger(e: Event) {
    e.preventDefault();

    const inputElement = this.imageUploadInput();

    if (!inputElement) return;
    inputElement.nativeElement.click();
  }

  uploadPhotos(formData: FormData) {
    this.photoRequestService.uploadPhotos(formData, this.csrfToken).subscribe({
      // TODO: 응답 및 에러에 관련된 핸들링 추가 필요
      next: (response) => {
        console.log('Upload successful:', response.imageUrls);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.authRequestService.getCsrfToken().subscribe({
      next: (response) => {
        this.csrfToken = response.csrfToken;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching CSRF token:', error);
      }
    });
  }
}
