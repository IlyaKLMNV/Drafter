import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoteCreate from './pages/NoteCreate';
import NoteEdit from './pages/NoteEdit';

const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/create" element={<NoteCreate />} />
          <Route path="/notes/edit/:id" element={<NoteEdit />} />
        </Routes>
      </div>

  );
};

export default App;
