import './styles.css';


const Note = ({
  note,
  toggleImportance,
  changeCouleurImportant,
  deleteNote,
  switchEditNum,
  changePhoneNumber,
  editNum,
  editPhoneNumber,
  handlePhoneNumber
  }) => {

  const label = note.important ? '! Important !' : 'No Important';
  
  const changeColorImportant = note.important
    ? {color: 'white', background: 'royalblue', borderColor: 'royalblue'}
    : {color: 'navy'};

  const secondLabel = note.editNum ? 'Hide' : 'Change';

  return (
    <div className="class--mainnote">

      <div className="class--subnote">

        <div key={note.id} className="data--div">
          <p>{note.content}&nbsp;-&nbsp;</p>
          <p>Phone : {note.phone}</p>
        </div>

        <div className="super--divbtn">
        </div>

        <div className="sub--divbtn">
          
          <div className="div--togglebtn">
            <button
              onClick={toggleImportance}
              className="btn--toggle"
              style={changeColorImportant}
            >
              {label}
            </button>
          </div>

          <div className="div--deletebtn">
            <button onClick={deleteNote} className="btn--delete">Delete</button>
          </div>

          <div className="div--editmain">

            {note.editNum ? (
              <div className="div--editinput">
                <input
                  value={editPhoneNumber}
                  onChange={handlePhoneNumber}
                  className="last--input"
                />
                <button onClick={changePhoneNumber} className="btn--enter">Ok !</button>
              </div>
              ) : (
              //console.log("setEditNum", note.editNum)
              null
              )}
          </div>

          <div className="div--editbtn">
            <button onClick={switchEditNum} className="btn--switch">
              {secondLabel}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Note;