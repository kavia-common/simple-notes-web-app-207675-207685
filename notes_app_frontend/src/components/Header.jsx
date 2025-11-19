import React from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
/**
 * Header for the Notes App.
 * Shows application name and can later host theme toggles or settings.
 */
function Header() {
  return (
    <header className="notes-app-header" role="banner" aria-label="Notes App Header">
      <h1 className="notes-app-title">📝 Notes</h1>
      <span style={{ fontWeight: 500, fontSize: '1.04em', letterSpacing: '1px', opacity: '0.9' }}>
        Capture your thoughts
      </span>
    </header>
  );
}

export default Header;
