import React from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
/**
 * Display a single note with content, actions, and timestamp.
 * @param {object} note
 * @param {function} onEdit
 * @param {function} onDelete
 */
function NoteItem({ note, onEdit, onDelete }) {
  // Human-readable short date/time
  const formatted = new Date(note.updatedAt || note.createdAt)
    .toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <article className="note-item" aria-label={`Note${note.title ? ': ' + note.title : ''}`}>
      {note.title && <div className="note-title">{note.title}</div>}
      <div className="note-content">{note.content}</div>
      <div className="note-footer">
        <span aria-label="Last updated" title={formatted}>
          {formatted}
        </span>
        <span className="note-item-buttons">
          <button
            className="button secondary"
            aria-label="Edit note"
            title="Edit"
            onClick={() => onEdit(note)}
            tabIndex={0}
          >
            Edit
          </button>
          <button
            className="button danger"
            aria-label="Delete note"
            title="Delete"
            onClick={() => onDelete(note)}
            tabIndex={0}
          >
            Delete
          </button>
        </span>
      </div>
    </article>
  );
}

export default NoteItem;
