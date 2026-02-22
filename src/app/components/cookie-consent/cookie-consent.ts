import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

declare var gtag: any;

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './cookie-consent.html',
  styles: []
})
export class CookieConsent implements OnInit {
  showBanner = signal(false);

  ngOnInit() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      this.showBanner.set(true);
    } else if (consent === 'accepted') {
      this.applyConsent('granted');
    }
  }

  accept() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.applyConsent('granted');
    this.showBanner.set(false);
  }

  decline() {
    localStorage.setItem('cookieConsent', 'declined');
    this.applyConsent('denied');
    this.showBanner.set(false);
  }

  private applyConsent(status: 'granted' | 'denied') {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': status
      });
    }
  }
}
