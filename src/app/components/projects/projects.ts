import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { TransitionService } from '../../services/transition.service';

interface Project {
  id: number;
  img?: string;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  tags: string[];
  delay: string;
  github?: string;
  demo?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective, CommonModule, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  protected readonly transitionService = inject(TransitionService);

  activeProjectIndex = signal(0);

  projectsList: Project[] = [
    
    {
      id: 1,
      img: '/assets/images/projects/garden-center-logo.png',
      titleKey: 'PROJECTS.PROJECT_2.TITLE',
      categoryKey: 'PROJECTS.PROJECT_2.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_2.DESCRIPTION',
      tags: ['Laravel', 'Vue 3', 'Inertia.js', 'Bootstrap', 'Filament'],
      delay: 'delay-300',
      demo: ''
    },
    {
      id: 2,
      img: '/assets/images/projects/il-botteghino-logo.png',
      titleKey: 'PROJECTS.PROJECT_3.TITLE',
      categoryKey: 'PROJECTS.PROJECT_3.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_3.DESCRIPTION',
      tags: ['Angular', 'PocketBase', 'Tailwind'],
      delay: 'delay-400',
      github: 'https://github.com/LucaGarizio/il-botteghino',
      demo: ''
    },
    {
      id: 3,
      img: '/assets/images/logo/logo.png',
      titleKey: 'PROJECTS.PROJECT_4.TITLE',
      categoryKey: 'PROJECTS.PROJECT_4.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_4.DESCRIPTION',
      tags: ['Angular', 'Tailwind', 'NGX-Translate', 'EmailJS'],
      delay: 'delay-500',
      github: 'https://github.com/LucaGarizio/Portfolio',
    },
    {
     id: 4,
      // img: '/assets/images/projects/kennel-dog.png',
      img: '/assets/images/projects/kennel-project-image.png',
      titleKey: 'PROJECTS.PROJECT_1.TITLE',
      categoryKey: 'PROJECTS.PROJECT_1.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_1.DESCRIPTION',
      tags: ['Angular', 'PrimeNG', 'PocketBase'],
      delay: 'delay-200',
      github: 'https://github.com/LucaGarizio/demo-kennel-admin-portal',
      demo: 'https://demo-kennel-admin-portal.vercel.app/'
    },
  ];

  projectsCenter() {
    if (this.projectsList.length <= 2) return 'lg:justify-center';
    if (this.projectsList.length <= 3) return '2xl:justify-center';
    return '';
  }

  onScroll() {
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    const totalWidth = container.scrollWidth;

    const scrollPercentage = scrollLeft / (totalWidth - width);
    const index = Math.round(scrollPercentage * (this.projectsList.length - 1));

    if (this.activeProjectIndex() !== index) {
      this.activeProjectIndex.set(index);
    }
  }


  scrollToIndex(index: number) {
    const container = this.scrollContainer.nativeElement;
    const totalWidth = container.scrollWidth;
    const containerWidth = container.offsetWidth;


    const targetScroll = (totalWidth - containerWidth) * (index / (this.projectsList.length - 1));

    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }
}