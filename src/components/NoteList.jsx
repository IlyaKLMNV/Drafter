import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote } from '../store/slices/notesSlice';
import NoteItem from './NoteItem';
import styles from '../CSSModules/NoteList.module.css';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const noteStatus = useSelector((state) => state.notes.status);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterLetter, setFilterLetter] = useState('');

  useEffect(() => {
    if (noteStatus === 'idle') {
      dispatch(fetchNotes());
    }
  }, [noteStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const filteredNotes = notes
    .filter(note => filterLetter === '' || note.title.toLowerCase().startsWith(filterLetter.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <div className={styles.noteListContainer}>
      <div className="mb-3 text-center">
      </div>
      <div className="mb-3 text-center">
        <label htmlFor="sortOrder" className="form-label">Порядок сортировки:</label>
        <select
          id="sortOrder"
          className="form-control"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">А-Я</option>
          <option value="desc">Я-А</option>
        </select>
      </div>
      <div className="list-group">
        {filteredNotes.map(note => (
          <NoteItem key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
