import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TransitionService } from '../../services/transition.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly transitionService = inject(TransitionService);
  protected readonly year = new Date().getFullYear();
}
