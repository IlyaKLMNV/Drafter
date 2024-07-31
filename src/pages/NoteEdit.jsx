import React from 'react';
import NoteForm from '../components/NoteForm';
import { useParams } from 'react-router-dom';

const NoteEdit = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Редактировать заметку</h1>
      <NoteForm noteId={id} />
    </div>
  );
};

export default NoteEdit;
