/**
 * Utility for localStorage-driven notes data.
 * All notes stored under key 'notes_app_items_v1'
 */

const STORAGE_KEY = 'notes_app_items_v1';

/**
 * PUBLIC_INTERFACE
 * Get all notes from storage.
 * @returns {Array} List of note objects.
 */
export function getNotes() {
  try {
    const notes = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(notes) ? notes : [];
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Save all notes to storage.
 * @param {Array} notes Array of note objects.
 */
export function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes || []));
}

/**
 * PUBLIC_INTERFACE
 * Add a new note.
 * @param {Object} note Note object.
 */
export function addNote(note) {
  const notes = getNotes();
  notes.unshift(note); // Most recent first
  saveNotes(notes);
}

/**
 * PUBLIC_INTERFACE
 * Update a note.
 * @param {string} id Note ID.
 * @param {Object} updated Note object to replace.
 */
export function updateNote(id, updated) {
  let notes = getNotes();
  notes = notes.map(n => n.id === id ? { ...n, ...updated } : n);
  saveNotes(notes);
}

/**
 * PUBLIC_INTERFACE
 * Delete a note by ID.
 * @param {string} id Note ID.
 */
export function deleteNote(id) {
  let notes = getNotes();
  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
}
