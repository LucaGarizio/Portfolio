import { Component, HostListener, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class Navbar {
  protected readonly isMenuOpen = signal(false);
  protected readonly isVisible = signal(true);
  protected readonly currentLang = signal('it');
  protected readonly activeSection = signal('hero');
  protected readonly isLangDropdownOpen = signal(false);
  private lastScrollTop = 0;
  private scrollTimer: any;

  constructor(private translate: TranslateService) {
    this.currentLang.set(this.translate.currentLang || 'it');
  }

  protected changeLanguage(lang: string): void {
    localStorage.setItem('preferredLang', lang);
    window.location.reload();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth >= 768) {
      this.isVisible.set(true);
      return;
    }

    if (this.isMenuOpen()) return;

    if (currentScroll > this.lastScrollTop && currentScroll > 64) {
      this.isVisible.set(false);
    } else {
      this.isVisible.set(true);
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    clearTimeout(this.scrollTimer);
    if (!this.isVisible()) {
      this.scrollTimer = setTimeout(() => {
        this.isVisible.set(true);
      }, 1000);
    }
  }

  protected setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
    if (this.isMenuOpen()) this.isVisible.set(true);
  }

  protected toggleLangDropdown(): void {
    this.isLangDropdownOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.isLangDropdownOpen.set(false);
  }
}
