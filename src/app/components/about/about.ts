import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

}
