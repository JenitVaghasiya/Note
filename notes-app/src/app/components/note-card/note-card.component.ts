import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.note);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.delete.emit(this.note.id);
    }
  }
}