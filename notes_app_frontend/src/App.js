import React, { useState } from 'react';
import './App.css';

// Color theme
const THEME = {
  primary: "#1976d2",
  secondary: "#424242",
  accent: "#ff9800"
};

/**
 * PUBLIC_INTERFACE
 * The main App component for the Notes application.
 * Layout:
 *  - Header with app title.
 *  - Main area split with sidebar (note list, left) and note detail (right).
 * Features:
 *  - Create, edit, delete, list, view notes.
 */
function App() {
  // Notes state: Array<{id, title, content, updated}>
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Welcome to NoteEase",
      content: "This is a sample note. Select, edit, or create new notes!",
      updated: new Date()
    }
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // PUBLIC_INTERFACE
  // Select a note by id
  function selectNote(id) {
    setSelectedId(id);
    setIsEditMode(false);
  }

  // PUBLIC_INTERFACE
  // Start creating a new note
  function handleNewNote() {
    setSelectedId(null);
    setEditTitle('');
    setEditContent('');
    setIsEditMode(true);
  }

  // PUBLIC_INTERFACE
  // Start editing the selected note
  function handleEditNote() {
    const active = notes.find(n => n.id === selectedId);
    setEditTitle(active?.title ?? '');
    setEditContent(active?.content ?? '');
    setIsEditMode(true);
  }

  // PUBLIC_INTERFACE
  // Cancel editing/creating
  function handleCancelEdit() {
    setIsEditMode(false);
    setEditTitle('');
    setEditContent('');
    if (!selectedId && notes.length > 0) setSelectedId(notes[0].id);
  }

  // PUBLIC_INTERFACE
  // Save a new or edited note
  function handleSaveNote() {
    if (!editTitle.trim()) return;
    if (selectedId && notes.some(n => n.id === selectedId)) {
      // Edit existing
      setNotes(notes.map(n =>
        n.id === selectedId
          ? { ...n, title: editTitle, content: editContent, updated: new Date() }
          : n
      ));
    } else {
      // Create new
      const newNote = {
        id: Date.now(),
        title: editTitle,
        content: editContent,
        updated: new Date()
      };
      setNotes([newNote, ...notes]);
      setSelectedId(newNote.id);
    }
    setIsEditMode(false);
    setEditTitle('');
    setEditContent('');
  }

  // PUBLIC_INTERFACE
  // Delete the currently selected note
  function handleDeleteNote() {
    if (!selectedId) return;
    const newList = notes.filter(n => n.id !== selectedId);
    setNotes(newList);
    if (newList.length > 0) {
      setSelectedId(newList[0].id);
    } else {
      setSelectedId(null);
    }
    setIsEditMode(false);
  }

  // Utility: Get currently selected note
  const activeNote = notes.find(n => n.id === selectedId);

  return (
    <div className="app-root" style={{ background: "var(--bg-primary, #fff)", minHeight: '100vh' }}>
      <Header />
      <main className="main-area">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={selectNote}
          onNewNote={handleNewNote}
          theme={THEME}
        />
        <section className="note-area">
          {!isEditMode && activeNote && (
            <NoteDetail
              note={activeNote}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              theme={THEME}
            />
          )}
          {!isEditMode && !activeNote && (
            <EmptyState message="No note selected." />
          )}
          {isEditMode && (
            <NoteEditor
              editTitle={editTitle}
              editContent={editContent}
              setEditTitle={setEditTitle}
              setEditContent={setEditContent}
              onSave={handleSaveNote}
              onCancel={handleCancelEdit}
              theme={THEME}
            />
          )}
        </section>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function Header() {
  // PUBLIC_INTERFACE
  // Renders the application header
  return (
    <header className="header-bar" style={{
      background: "#fff",
      color: "#222",
      borderBottom: "1px solid #eaeaea"
    }}>
      <span className="header-logo" style={{
        color: "#ff9800",
        fontWeight: "bold",
        fontSize: "1.5rem",
        marginRight: "0.5rem"
      }}>
        🗒️
      </span>
      <span className="header-title">
        NoteEase
      </span>
    </header>
  );
}

// PUBLIC_INTERFACE
function Sidebar({ notes, selectedId, onSelect, onNewNote, theme }) {
  // PUBLIC_INTERFACE
  // Renders the sidebar with the note list and a New Note button
  return (
    <aside className="sidebar" style={{
      background: "#f8f9fa",
      minWidth: 260,
      borderRight: "1px solid #eaeaea",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
        <button
          className="btn-new"
          style={{
            background: theme.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1rem",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer"
          }}
          onClick={onNewNote}
        >
          + New Note
        </button>
      </div>
      <ul className="note-list" style={{
        flex: 1,
        listStyle: 'none',
        margin: 0,
        padding: 0,
        overflowY: 'auto'
      }}>
        {notes.length === 0 &&
          <li className="note-list-empty" style={{ textAlign: "center", color: "#bbb", marginTop: 40 }}>
            No notes yet.
          </li>
        }
        {notes.map(note => (
          <li
            key={note.id}
            className={`note-list-item${selectedId === note.id ? ' active' : ''}`}
            onClick={() => onSelect(note.id)}
            style={{
              padding: "0.75rem 1rem",
              borderLeft: selectedId === note.id ? `4px solid ${theme.accent}` : "4px solid transparent",
              background: selectedId === note.id ? "#fff5e1" : "transparent",
              color: selectedId === note.id ? theme.accent : "#222",
              cursor: "pointer",
              borderBottom: "1px solid #f1f1f1",
              fontWeight: selectedId === note.id ? 600 : 400,
              transition: "all 0.2s"
            }}>
            <div className="note-list-title" style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontSize: 16
            }}>
              {note.title || <span style={{ color: "#bbb" }}>Untitled</span>}
            </div>
            <div className="note-list-updated" style={{
              fontSize: 12,
              color: "#888"
            }}>
              {note.updated ? (new Date(note.updated)).toLocaleString() : ''}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// PUBLIC_INTERFACE
function NoteDetail({ note, onEdit, onDelete, theme }) {
  // PUBLIC_INTERFACE
  // Renders the note details pane (read only, with edit/delete actions)
  return (
    <div className="note-detail" style={{
      padding: "2.5rem 2rem 2rem 2rem",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <h2 style={{ color: theme.primary, marginBottom: 8, marginTop: 0 }}>
          {note.title}
        </h2>
        <div style={{ fontSize: 15, color: "#222", whiteSpace: "pre-wrap", marginBottom: 16 }}>
          {note.content}
        </div>
        <div style={{ color: "#888", fontSize: 12 }}>Last updated: {note.updated ? (new Date(note.updated)).toLocaleString() : ''}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.5rem",
          marginTop: 18
        }}>
        <button
          onClick={onEdit}
          className="btn-edit"
          style={{
            background: theme.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1.2rem",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="btn-delete"
          style={{
            background: theme.accent,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1.2rem",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function NoteEditor({ editTitle, editContent, setEditTitle, setEditContent, onSave, onCancel, theme }) {
  // PUBLIC_INTERFACE
  // Renders the note edit/create form
  return (
    <form className="note-editor" style={{
      padding: "2.5rem 2rem 2rem 2rem",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}
      onSubmit={e => { e.preventDefault(); onSave(); }}
    >
      <label htmlFor="note-title" style={{ fontWeight: 600, color: "#213", marginBottom: 6 }}>Title</label>
      <input
        id="note-title"
        className="note-editor-title"
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        maxLength={80}
        placeholder="Your note title"
        autoFocus
        style={{
          fontSize: 18,
          padding: "0.5rem",
          border: "1.5px solid #e0e0e0",
          borderRadius: 5,
          marginBottom: 18
        }}
      />
      <label htmlFor="note-content" style={{ fontWeight: 600, color: "#213", marginBottom: 6 }}>Content</label>
      <textarea
        id="note-content"
        className="note-editor-content"
        value={editContent}
        onChange={e => setEditContent(e.target.value)}
        rows={8}
        style={{
          fontSize: 16,
          border: "1.5px solid #e0e0e0",
          borderRadius: 5,
          padding: "0.5rem",
          marginBottom: 15
        }}
        placeholder="Start typing your note here..."
      />
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "auto" }}>
        <button
          type="button"
          className="btn-cancel"
          onClick={onCancel}
          style={{
            background: "#f5f5f5",
            color: "#888",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1.2rem",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-save"
          style={{
            background: theme.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1.2rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
          disabled={!editTitle.trim()}
        >
          Save
        </button>
      </div>
    </form>
  );
}

// PUBLIC_INTERFACE
function EmptyState({ message }) {
  // PUBLIC_INTERFACE
  // Displays an empty state message in the note pane
  return (
    <div style={{
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      color: "#bbb",
      fontSize: 18
    }}>
      {message}
    </div>
  );
}

export default App;
