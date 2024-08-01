import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, selectNoteById } from '../store/slices/notesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../CSSModules/NoteForm.module.css';

const NoteEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const note = useSelector((state) => selectNoteById(state, Number(id)));
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      setError('Заголовок и текст заметки не может быть пустым');
      return;
    }
    dispatch(updateNote({ id: Number(id), title, content }));
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
        <button type="submit" className="btn btn-primary">Update Note</button>
      </form>
    </div>
  );
};

export default NoteEdit;
