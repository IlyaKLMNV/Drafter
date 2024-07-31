import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NOTES_URL = 'http://localhost:3001/notes';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(NOTES_URL);
  return response.data;
});

export const addNote = createAsyncThunk('notes/addNote', async (newNote) => {
  const response = await axios.post(NOTES_URL, newNote);
  return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (updatedNote) => {
  const response = await axios.put(`${NOTES_URL}/${updatedNote.id}`, updatedNote);
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`${NOTES_URL}/${id}`);
  return id;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        state.notes[index] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      });
  },
});

export const selectNoteById = (state, noteId) => state.notes.notes.find(note => note.id === noteId);

export default notesSlice.reducer;
