import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import emailjs from '@emailjs/browser';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RevealDirective, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  animations: [
    trigger('contentFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms 200ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ position: 'absolute', inset: 0, padding: 'inherit' }),
        animate('400ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class Contact {
  private readonly fb = inject(FormBuilder);

  protected readonly isSubmitting = signal(false);
  protected readonly submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  protected readonly contactForm = this.fb.group({
    user_name: ['', [Validators.required, Validators.minLength(2)]],
    user_email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected async onSubmit(): Promise<void> {
    if (this.contactForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    try {
      const templateParams = {
        name: this.contactForm.value.user_name,
        from_name: this.contactForm.value.user_name,
        email: this.contactForm.value.user_email,
        from_email: this.contactForm.value.user_email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        to_name: 'Luca',
      };

      await emailjs.send(
        'service_98qo95r',
        'template_4omubir',
        templateParams,
        'fjciTUxhIF0Kyo8Sj'
      );

      this.submitStatus.set('success');
      this.contactForm.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.submitStatus.set('error');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
