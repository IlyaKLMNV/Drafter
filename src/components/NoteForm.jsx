import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, updateNote, selectNoteById } from '../store/slices/notesSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../CSSModules/NoteForm.module.css';

const NoteForm = ({ noteId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const note = useSelector((state) => selectNoteById(state, Number(noteId))) || { title: '', content: '' };
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    if (noteId && note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [noteId, note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteId) {
      dispatch(updateNote({ id: Number(noteId), title, content }));
    } else {
      dispatch(addNote({ title, content }));
    }
    navigate('/');
  };

  return (
    <div className={styles.noteFormContainer}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className={`form-label ${styles.formLabel}`}>Заголовок</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className={`form-label ${styles.formLabel}`}>Текст</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">{noteId ? 'Update Note' : 'Create Note'}</button>
      </form>
    </div>
  );
};

export default NoteForm;
