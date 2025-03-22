import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      author: ['', Validators.required],
      pages: [null, Validators.required, Validators.min(0)],
      language: ['', Validators.required], 
      genre: ['', Validators.required], 
      description: [''], 
    });
  }
}
