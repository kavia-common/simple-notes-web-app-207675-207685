import React from 'react';
import NoteItem from './NoteItem';
import '../styles/theme.css';

// PUBLIC_INTERFACE
/**
 * List of notes. Renders empty state if none.
 * @param {Array} notes
 * @param {function} onEdit
 * @param {function} onDelete
 */
function NotesList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return (
      <div className="notes-list notes-empty-state">
        No notes yet. Start capturing ideas!
      </div>
    );
  }
  return (
    <div className="notes-list" aria-label="List of notes">
      {notes.map(note =>
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
}

export default NotesList;
