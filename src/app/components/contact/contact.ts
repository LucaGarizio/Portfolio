import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RevealDirective, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
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
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: this.contactForm.value.user_name,
          to_name: 'Luca',
          from_email: this.contactForm.value.user_email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
        },
        'YOUR_PUBLIC_KEY'
      );

      this.submitStatus.set('success');
      this.contactForm.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.submitStatus.set('error');
    } finally {
      this.isSubmitting.set(false);

      if (this.submitStatus() === 'success') {
        setTimeout(() => this.submitStatus.set('idle'), 5000);
      }
    }
  }
}
