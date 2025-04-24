// note-form.component.ts
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit, OnChanges {
  @Input() noteToEdit: Note | null = null;
  @Output() save = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<void>();

  noteForm!: FormGroup;
  formTitle = 'Create Note';
  formInitialized = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.formInitialized = true;
    
    // Apply noteToEdit value if it was provided before form initialization
    if (this.noteToEdit) {
      this.formTitle = 'Edit Note';
      this.noteForm.patchValue(this.noteToEdit);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only process changes if the form has been initialized
    if (!this.formInitialized || !this.noteForm) {
      return;
    }
    
    // Check if noteToEdit exists and has changed
    if (changes['noteToEdit']) {
      if (changes['noteToEdit'].currentValue) {
        this.formTitle = 'Edit Note';
        this.noteForm.patchValue(changes['noteToEdit'].currentValue);
      } else {
        this.formTitle = 'Create Note';
        this.noteForm.reset();
      }
    }
  }

  initForm(): void {
    // Initialize with empty/default values
    this.noteForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1000)]
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.save.emit(this.noteForm.value);
      this.noteForm.reset();
      this.formTitle = 'Create Note';
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.noteForm.reset();
    this.formTitle = 'Create Note';
  }
}