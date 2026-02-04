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
      img: 'assets/images/projects/crunch.png',
      titleKey: 'PROJECTS.PROJECT_1.TITLE',
      categoryKey: 'PROJECTS.PROJECT_1.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_1.DESCRIPTION',
      tags: ['Angular', 'Tailwind', 'NestJs', 'PostgreSQL'],
      delay: 'delay-100',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      id: 2,
      img: 'https://picsum.photos/300/400',
      titleKey: 'PROJECTS.PROJECT_2.TITLE',
      categoryKey: 'PROJECTS.PROJECT_2.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_2.DESCRIPTION',
      tags: ['Angular', 'PrimeNG', 'Bootstrap', 'PocketBase'],
      delay: 'delay-200',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      id: 3,
      img: 'https://picsum.photos/400/400',
      titleKey: 'PROJECTS.PROJECT_3.TITLE',
      categoryKey: 'PROJECTS.PROJECT_3.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_3.DESCRIPTION',
      tags: ['Angular', 'GSAP', 'Tailwind'],
      delay: 'delay-300',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      id: 3,
      img: 'https://picsum.photos/400/400',
      titleKey: 'PROJECTS.PROJECT_3.TITLE',
      categoryKey: 'PROJECTS.PROJECT_3.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_3.DESCRIPTION',
      tags: ['Angular', 'GSAP', 'Tailwind'],
      delay: 'delay-300',
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
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

  scroll(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;

    const scrollAmount = direction === 'left' ? -482 : 482;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}