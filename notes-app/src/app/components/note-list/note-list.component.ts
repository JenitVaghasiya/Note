import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  isCardView = true;
  showForm = false;
  loading = false;
  error = '';

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    this.noteService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load notes. Please try again later.';
        console.error('Error loading notes:', err);
        this.loading = false;
      }
    });
  }

  toggleView(): void {
    this.isCardView = !this.isCardView;
  }

  openCreateForm(): void {
    this.selectedNote = null;
    this.showForm = true;
  }

  editNote(note: Note): void {
    this.selectedNote = { ...note };
    this.showForm = true;
  }

  saveNote(note: Note): void {
    this.loading = true;
    
    if (note.id) {
      // Update existing note
      this.noteService.updateNote(note).subscribe({
        next: () => {
          this.loadNotes();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Failed to update note. Please try again.';
          console.error('Error updating note:', err);
          this.loading = false;
        }
      });
    } else {
      // Create new note
      this.noteService.createNote(note).subscribe({
        next: () => {
          this.loadNotes();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Failed to create note. Please try again.';
          console.error('Error creating note:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteNote(id: number): void {
    this.loading = true;
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.loadNotes();
      },
      error: (err) => {
        this.error = 'Failed to delete note. Please try again.';
        console.error('Error deleting note:', err);
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    this.selectedNote = null;
    this.showForm = false;
  }
}