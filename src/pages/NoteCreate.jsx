import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/slices/notesSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../CSSModules/NoteForm.module.css';

const NoteCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      setError('Заголовок и текст заметки не может быть пустым');
      return;
    }
    dispatch(addNote({ title, content }));
    navigate('/');
  };

  return (
    <div className={styles.noteFormContainer}>
      {error && <p className={styles.error}>{error}</p>}
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
        <button type="submit" className="btn btn-primary">Create Note</button>
      </form>
    </div>
  );
};

export default NoteCreate;
