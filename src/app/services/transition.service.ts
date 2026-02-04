import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  isTransitioning = signal(false);
  isEntering = signal(true);

  startTransition(url: string, target: string = '_self'): void {
    if (this.isTransitioning()) return;

    this.isTransitioning.set(true);

    setTimeout(() => {
      window.open(url, target);

      setTimeout(() => {
        this.isTransitioning.set(false);
      }, 1000);
    }, 900);
  }
}
