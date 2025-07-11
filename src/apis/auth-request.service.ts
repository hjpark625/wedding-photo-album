import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.API_SERVER;

  getCsrfToken() {
    return this.http.get<{ csrfToken: string }>(`${this.apiUrl}csrf/token`, {
      withCredentials: true
    });
  }

  getQrAccessValidation(expires: string, sig: string) {
    return this.http.get<{ message: string }>(`${this.apiUrl}qr-access`, {
      withCredentials: true,
      params: { expires, sig }
    });
  }
}
