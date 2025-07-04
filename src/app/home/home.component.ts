import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoRequestService } from '@/apis/photo-request.service';
import { AuthRequestService } from '@/apis/auth-request.service';

import { FirstSectionComponent } from '@/app/first-section/first-section.component';
import { SecondSectionComponent } from '@/app/second-section/second-section.component';

import type { HttpErrorResponse } from '@angular/common/http';
import type { OnDestroy, OnInit } from '@angular/core';

@Component({
  imports: [FirstSectionComponent, SecondSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private photoRequestService = inject(PhotoRequestService);
  private authRequestService = inject(AuthRequestService);
  private route = inject(ActivatedRoute);

  private csrfToken = '';

  readonly isValidated = signal(false);

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

  private contextMenuEventHandler(e: MouseEvent) {
    e.preventDefault();
    return;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const expires = params['expires'];
      const sig = params['sig'];

      if (!expires || !sig) {
        return window.alert('잘못된 접근입니다. 새로고침 후 다시 시도해주세요.');
      }

      this.authRequestService.getQrAccessValidation(expires, sig).subscribe({
        next: () => {
          this.isValidated.set(true);

          this.authRequestService.getCsrfToken().subscribe({
            next: (response) => {
              this.csrfToken = response.csrfToken;
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error fetching CSRF token:', error);
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 403 || error.status === 401) {
            return window.alert(error.error.message);
          }
        }
      });
    });

    window.addEventListener('contextmenu', this.contextMenuEventHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('contextmenu', this.contextMenuEventHandler);
  }
}
