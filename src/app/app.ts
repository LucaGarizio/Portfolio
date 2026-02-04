import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Hero, About, Projects, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
  protected readonly scrollProgress = signal(0);

  constructor(
    private translate: TranslateService,
    private titleService: Title
  ) {
    const savedLang = localStorage.getItem('preferredLang') || 'it';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);

    this.translate.get('PAGE_TITLE').subscribe((translatedTitle: string) => {
      this.titleService.setTitle(translatedTitle);
    });

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const progress = (currentScroll / totalHeight) * 100;
    this.scrollProgress.set(progress);
  }
}
