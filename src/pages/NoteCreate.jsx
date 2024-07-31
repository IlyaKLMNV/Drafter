import React from 'react';
import NoteForm from '../components/NoteForm';

const NoteCreate = () => {
  return (
    <div>
      <h1 className='text-center'>Создать заметку</h1>
      <NoteForm />
    </div>
  );
};

export default NoteCreate;
