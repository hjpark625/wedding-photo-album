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
      next: () => {
        return window.alert('사진 업로드가 완료되었습니다. 감사합니다.');
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error(error);
          return window.alert('비정상적인 접근입니다. 새로고침 후 다시 시도해주세요.');
        }
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
