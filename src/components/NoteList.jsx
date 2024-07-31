import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote } from '../store/slices/notesSlice';
import NoteItem from './NoteItem';
import { Link } from 'react-router-dom';
import styles from '../CSSModules/NoteList.module.css';

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const noteStatus = useSelector((state) => state.notes.status);

  useEffect(() => {
    if (noteStatus === 'idle') {
      dispatch(fetchNotes());
    }
  }, [noteStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div className={styles.noteListContainer}>
      <div className={styles.noteListHeader}>
        <h2>Заметки</h2>
        <Link to="/notes/create">
          <button className="btn btn-primary btn-create">Создать новую заметку</button>
        </Link>
      </div>
      <div className="list-group">
        {notes.map(note => (
          <NoteItem key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
  </div>
  );
};

export default NoteList;
