import { Injectable, inject } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import type { UploadImagesResponse } from '@/apis/types/photo-request.type';

@Injectable({
  providedIn: 'root'
})
export class PhotoRequestService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.API_SERVER;

  uploadPhotos(formData: FormData, csrfToken: string) {
    return this.http.post<UploadImagesResponse>(`${this.apiUrl}image/upload`, formData, {
      headers: new HttpHeaders({ 'x-csrf-token': csrfToken }),
      withCredentials: true
    });
  }
}
