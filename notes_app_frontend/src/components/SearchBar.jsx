import React from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
/**
 * Search input for filtering notes.
 * @param {string} value
 * @param {function} onChange
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="notes-search" className="sr-only">
        Search notes
      </label>
      <input
        id="notes-search"
        type="search"
        placeholder="Search notes by title or content…"
        autoComplete="off"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Filter notes"
      />
    </div>
  );
}

export default SearchBar;
