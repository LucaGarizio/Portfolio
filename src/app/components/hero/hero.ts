import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
