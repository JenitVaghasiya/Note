// note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) { }

  // Get all notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  // Get a specific note
  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  // Create a new note - UPDATED to omit ID
  createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Observable<Note> {
    // Only send title and description, let the server handle the rest
    return this.http.post<Note>(this.apiUrl, {
      title: note.title,
      description: note.description
    });
  }

  // Update an existing note
  updateNote(note: Note): Observable<any> {
    return this.http.put(`${this.apiUrl}/${note.id}`, note);
  }

  // Delete a note
  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}