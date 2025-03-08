import { useEffect, useState } from "react";
import { Note, NewNote, Weather, Visibility } from './types';
import { getAllNotes, createNote } from './noteService';
import React from "react";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string>('');
  const [newNote, setNewNote] = useState<NewNote>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: ''
  });
  
  useEffect(() => {
    getAllNotes().then(data => {
      setNotes(data)
    })
  }, [])
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewNote({
      ...newNote,
      [name]: value
    });
  };

  const noteCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
    await createNote(newNote).then(data => {
      setNotes(notes.concat(data));
    });
    setNewNote({
      date: '',
      weather: Weather.Sunny,
      visibility: Visibility.Good,
      comment: ''
    });
    setError('');
  } catch (error) { 
    if (error instanceof Error) {
    setError(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Add new Entry</h1>
      <form onSubmit={noteCreation}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newNote.date}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div style={{ display: 'flex'}}> 
        <label>Weather:</label>
        {Object.values(Weather).map((weather) => (
          <div key={weather}>
          <input type="radio" id={weather} name="weather" value={weather}
          onChange={(e) => handleChange(e)}/>
          <label htmlFor={weather}>{weather}</label>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex'}}> 
      <label>Visibility:</label>
        {Object.values(Visibility).map((visibility) => (
          <div key={visibility}>
          <input type="radio" id={visibility} name="visibility" value={visibility}
          onChange={(e) => handleChange(e)}/>
          <label htmlFor={visibility}>{visibility}</label>
          </div>
        ))}
      </div>

        <div>
          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            value={newNote.comment || ''}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Add Note</button>
      </form>
      <br/>

      {error ? 
      <div style={{ color: 'red' }}>Error: {error}</div> : null}

      <h1>Diaries</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h3>Date: {note.date}</h3>
            <p>Weather: {note.weather}</p>
            <p>Visibility: {note.visibility}</p>
            {note.comment && <p>Comment: {note.comment}</p>}
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;