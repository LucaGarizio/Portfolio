import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface Project {
  id: number;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  tags: string[];
  delay: string;
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

  projectsList: Project[] = [
    {
      id: 1,
      titleKey: 'PROJECTS.PROJECT_1.TITLE',
      categoryKey: 'PROJECTS.PROJECT_1.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_1.DESCRIPTION',
      tags: ['Angular', 'Tailwind', 'Firebase'],
      delay: 'delay-100'
    },
    {
      id: 2,
      titleKey: 'PROJECTS.PROJECT_2.TITLE',
      categoryKey: 'PROJECTS.PROJECT_2.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_2.DESCRIPTION',
      tags: ['D3.js', 'Angular', 'SCSS'],
      delay: 'delay-200'
    },
    {
      id: 3,
      titleKey: 'PROJECTS.PROJECT_3.TITLE',
      categoryKey: 'PROJECTS.PROJECT_3.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_3.DESCRIPTION',
      tags: ['Angular', 'GSAP', 'Tailwind'],
      delay: 'delay-300'
    },
    {
      id: 4,
      titleKey: 'PROJECTS.PROJECT_4.TITLE',
      categoryKey: 'PROJECTS.PROJECT_4.CATEGORY',
      descriptionKey: 'PROJECTS.PROJECT_4.DESCRIPTION',
      tags: ['Node.js', 'Angular', 'PostgreSQL'],
      delay: 'delay-400'
    }
  ];

  scroll(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = direction === 'left' ? -482 : 482;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}