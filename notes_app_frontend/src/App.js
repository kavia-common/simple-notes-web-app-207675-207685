import React, { useEffect, useState } from 'react';
import './styles/theme.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote
} from './utils/storage';

// Util for unique ids
const createId = () => '_' + Math.random().toString(36).slice(2, 10);

// PUBLIC_INTERFACE
/**
 * The Notes App (single-page, localStorage-powered, styled).
 */
function App() {
  // Notes and UI state
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState(null); // note being edited or null

  // Load notes from storage on mount
  useEffect(() => {
    setNotes(getNotes());
  }, []);

  // Persist notes when changed
  useEffect(() => {
    // This ensures immediate localStorage sync if setNotes called.
    if (notes) {
      localStorage.setItem('notes_app_items_v1', JSON.stringify(notes));
    }
  }, [notes]);

  // Add note
  const handleAdd = (note) => {
    const newNote = {
      id: createId(),
      title: note.title.trim(),
      content: note.content.trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addNote(newNote);
    setNotes([newNote, ...notes]);
  };

  // Begin edit
  const handleEdit = (note) => {
    setEditing(note);
  };

  // Save edit
  const handleEditSave = (updated) => {
    const now = Date.now();
    const newNotes = notes.map(n =>
      n.id === updated.id
        ? { ...n, ...updated, updatedAt: now }
        : n
    );
    updateNote(updated.id, { ...updated, updatedAt: now });
    setNotes(newNotes);
    setEditing(null);
  };

  // Delete with confirmation
  const handleDelete = (note) => {
    if (
      window.confirm(
        `Delete this note${note.title ? ` (“${note.title}”)` : ''}?\nThis action cannot be undone.`
      )
    ) {
      deleteNote(note.id);
      setNotes(notes.filter(n => n.id !== note.id));
      if (editing && editing.id === note.id) setEditing(null);
    }
  };

  // Search/filter
  const filterValue = filter.trim().toLowerCase();
  const filteredNotes =
    !filterValue
      ? notes
      : notes.filter(
          n =>
            (n.title && n.title.toLowerCase().includes(filterValue)) ||
            (n.content && n.content.toLowerCase().includes(filterValue))
        );

  // Responsive single-column layout
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <div className="single-column">
        <Header />
        <SearchBar value={filter} onChange={setFilter} />
        {editing ? (
          <NoteForm
            key={editing.id}
            initial={editing}
            onSave={handleEditSave}
            onCancel={() => setEditing(null)}
            mode="edit"
          />
        ) : (
          <NoteForm onSave={handleAdd} mode="add" />
        )}
        <NotesList notes={filteredNotes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
