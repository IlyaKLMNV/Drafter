import React from 'react';
import NoteList from '../components/NoteList';
import { Link } from 'react-router-dom';
import styles from '../CSSModules/Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className="text-center">Заметки</h1>
      <div className="text-center mb-3">
        <Link to="/notes/create">
          <button className="btn btn-primary">Создать новую заметку</button>
        </Link>
      </div>
      <NoteList />
    </div>
  );
};

export default Home;
