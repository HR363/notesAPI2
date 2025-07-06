import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

interface Toast {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  loading = false;
  saving = false;
  showCreateModal = false;
  editingNote: Note | null = null;
  
  noteFormData = {
    title: '',
    content: ''
  };

  toast: Toast = {
    show: false,
    message: '',
    type: 'success'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNotes();
  }

  async loadNotes() {
    this.loading = true;
    try {
      this.notes = await this.http.get<Note[]>('http://localhost:3000/notes').toPromise() || [];
    } catch (error) {
      this.showToast('Failed to load notes', 'error');
    } finally {
      this.loading = false;
    }
  }

  async saveNote() {
    if (!this.noteFormData.title.trim() || !this.noteFormData.content.trim()) {
      return;
    }

    this.saving = true;
    try {
      if (this.editingNote) {
        // Update existing note
        const updatedNote = await this.http.patch<Note>(
          `http://localhost:3000/notes/${this.editingNote.id}`,
          this.noteFormData
        ).toPromise();
        
        if (updatedNote) {
          const index = this.notes.findIndex(n => n.id === this.editingNote!.id);
          if (index !== -1) {
            this.notes[index] = updatedNote;
          }
          this.showToast('Note updated successfully', 'success');
        }
      } else {
        // Create new note
        const newNote = await this.http.post<Note>(
          'http://localhost:3000/notes',
          this.noteFormData
        ).toPromise();
        
        if (newNote) {
          this.notes.unshift(newNote);
          this.showToast('Note created successfully', 'success');
        }
      }
      
      this.closeModal();
    } catch (error) {
      this.showToast(
        this.editingNote ? 'Failed to update note' : 'Failed to create note',
        'error'
      );
    } finally {
      this.saving = false;
    }
  }

  editNote(note: Note) {
    this.editingNote = note;
    this.noteFormData = {
      title: note.title,
      content: note.content
    };
  }

  async deleteNote(id: number) {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await this.http.delete(`http://localhost:3000/notes/${id}`).toPromise();
      this.notes = this.notes.filter(note => note.id !== id);
      this.showToast('Note deleted successfully', 'success');
    } catch (error) {
      this.showToast('Failed to delete note', 'error');
    }
  }

  closeModal() {
    this.showCreateModal = false;
    this.editingNote = null;
    this.noteFormData = {
      title: '',
      content: ''
    };
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toast = {
      show: true,
      message,
      type
    };
    
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.toast.show = false;
  }

  trackByNoteId(index: number, note: Note): number {
    return note.id;
  }
}
