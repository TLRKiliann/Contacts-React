import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import SearchComponent from './components/SearchComponent';
import Video from './videos/glitchtv.mp4';
import './App.css';


const App = () => {

  const [notes, setNotes] = useState([]);
  const [searchNote, setSearchNote] = useState([]);
  const [filterNote, setFilterNote] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [editPhoneNumber, setEditPhoneNumber] = useState([]);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []);

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  //tbl with id: notes.length + 1 (same id make an error 500 with db.json)
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: new Date().toISOString(),
      content: newNote,
      phone: newPhone,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      editNum: false
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setNewPhone('')
      })
  };

  //Search & return name (note.content) & number (note.phone)
  const inputNote = (event) => {
    const searchNote = event.target.value; 
    setSearchNote(searchNote);
    const newFilter = notes.map(note => note).filter(note => {
      return note.content === searchNote ? `${note.content} ${note.phone}` : null
    });
    console.log("newFilter", newFilter)
    event.preventDefault();
    if (searchNote === '') {
      setNotes(notes);
    } else {
      setFilterNote(newFilter);
    }
  };

  const handlePhoneNumber = (e) => {
    setEditPhoneNumber(e.target.value);
  };

  //Filter with editNum (db + render) to access change phone number
  const switchEditNum = (id) => {
    const note = notes.find(n => n.id === id)
    const switchEdit = { ...note, editNum: !note.editNum }
    setEditPhoneNumber(note ? note.phone : null);

    noteService
      .update(id, switchEdit)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.log("Error server with note.editNum");
        setNotes(notes.filter(n => n.id !== id))
      })
    console.log("OUUUUaiiiiiis !")
  };

  //Change phone number !
  const changePhoneNumber = (id) => {
    const note = notes.find(n => n.id === id)
    const newNumber = {...note, phone: editPhoneNumber};

    noteService
      .update(id, newNumber)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note));
      })
      .catch(error => {
        alert(`the note '${note.phone}' not found !`)
        setNotes(notes.filter(n => n.id !== id))
      })
    setEditPhoneNumber([]);
  };

  //Switch importance
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  };

  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id)
    if (window.confirm(`Delete ${note.content} ?`)) {
      noteService
        .remove(id)
        .then(returnedNote => {
          setNotes(notes.filter(note => note.id !== id))
        })
        .catch(error => {
          alert(`the note '${note.content}' was already deleted from server`)
          setNotes(notes.filter(note => note.id !== id))
        })
    } else {
      return null;
    }
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <div className="anima--div">

        <video className="video--anima" autoPlay>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="first--div"></div>
        <div className="second--div"></div>

      </div>

      <div className="div--p"><p>404</p></div>

      <div className="mainapp--div">

        <div className="secmainapp--div">

          <header>
            <h1>Contacts</h1>
          </header>

          <div className="div--important">

            <button onClick={() => setShowAll(!showAll)} className="btn--important">
              Show {showAll ? 'Important' : 'All'}
            </button>

          </div>

          <ul className="ul--tag">
            {notesToShow.map(note =>
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}

                deleteNote={() => deleteNote(note.id)}

                editNum={note.editNum}
                switchEditNum={() => switchEditNum(note.id)}

                editPhoneNumber={editPhoneNumber}
                handlePhoneNumber={(e) => handlePhoneNumber(e)}
                changePhoneNumber={() => changePhoneNumber(note.id)}
              />
            )}
          </ul>

          <div className="form--div">
            
            <div className="div--inputsearch">
              <label className="lbl--search">
                Search Contact :&nbsp;
              </label>

              <input value={searchNote} onChange={inputNote} className="input--search" />

              {filterNote.slice(0, 5).map((note) => (
                <SearchComponent
                  key={note.id}
                  content={note.content}
                  phone={note.phone}
                />
                ))}
            </div>
            
            <form onSubmit={addNote}>
              <fieldset>
                <legend>Contact Register</legend>

                <div className="form--display">
                  <label style={{marginRight: '10px'}}>Name : </label>
                  <input
                    value={newNote}
                    onChange={(e) => handleNoteChange(e)}
                  />
                </div>
                <div className="form--display">
                  <label style={{marginRight: '10px'}}>Phone number : </label>
                  <input
                    value={newPhone}
                    onChange={(e) => handlePhoneChange(e)}
                  />
                </div>
                <div className="btn--div">
                  <button type="submit" className="btn--submit">Save</button>
                </div>

              </fieldset>
            </form>

          </div>

        </div>

          <footer>
            <nav>
              <ul>
                <li>Made in React</li>
                <li>Created by ko@l@tr33</li>
              </ul>
            </nav>
          </footer>

      </div>

    </div>
  );
};

export default App;

//Question

/*
Pourquoi ne pas utiliser event.preventDefault() avec event.target.value (event.target.elements.obj.value).

Révision concat() / setNotes(notes.concat(returnNote)) (addition de 2 listes)
*/

