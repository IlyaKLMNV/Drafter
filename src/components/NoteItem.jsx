import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSSModules/NoteItem.module.css';

const NoteItem = ({ note, onDelete }) => {
  return (
    <div className={styles.noteItem}>
      <div>
        <h5>{note.title}</h5>
        <p>{note.content}</p>
      </div>
      <div className={styles.noteButtons}>
        <Link to={`/notes/edit/${note.id}`}>
          <button className={`btn btn-secondary ${styles.noteButton}`}>Редактировать</button>
        </Link>
        <button className={`btn btn-danger ${styles.noteButton}`} onClick={() => onDelete(note.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default NoteItem;
