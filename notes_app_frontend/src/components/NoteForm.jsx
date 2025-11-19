import React, { useState, useEffect, useRef } from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
/**
 * Note creation and editing form.
 * Props:
 * - initial (object) initial values, { title, content }
 * - onSave (function) callback with ({ id?, title, content })
 * - onCancel (optional function) to cancel edit
 * - mode ("add" | "edit")
 */
function NoteForm({ initial = {}, onSave, onCancel, mode = "add" }) {
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');
  const [error, setError] = useState('');

  const contentRef = useRef();

  useEffect(() => {
    setTitle(initial.title || '');
    setContent(initial.content || '');
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) {
      setError('Content is required.');
      contentRef.current.focus();
      return;
    }
    setError('');
    onSave({
      ...(initial.id ? { id: initial.id } : {}),
      title: title.trim(),
      content: content.trim(),
    });
    setTitle('');
    setContent('');
  }

  function handleContentChange(e) {
    setContent(e.target.value);
    if (error && e.target.value.trim()) setError('');
  }

  return (
    <form className="note-form" onSubmit={handleSubmit} aria-label={mode === "edit" ? "Edit note" : "Add note"}>
      <div>
        <label htmlFor="note-title">
          Title (optional)
        </label>
        <input
          id="note-title"
          type="text"
          maxLength={90}
          autoComplete="off"
          placeholder="Title…"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="note-content">
          Content <span aria-hidden="true" style={{ color: 'var(--error)' }}>*</span>
        </label>
        <textarea
          ref={contentRef}
          id="note-content"
          rows={mode === "edit" ? 4 : 3}
          placeholder="Write your note here (required)…"
          value={content}
          onChange={handleContentChange}
          required
        />
      </div>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      <div className="note-form-actions">
        <button type="submit" className="button" aria-label={mode === "edit" ? "Save changes" : "Add note"}>
          {mode === "edit" ? "Save" : "Add"}
        </button>
        {mode === "edit" && (
          <button type="button" className="button secondary" onClick={onCancel} aria-label="Cancel edit">Cancel</button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
