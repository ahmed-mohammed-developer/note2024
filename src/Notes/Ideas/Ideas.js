import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';


const Ideas = ({ note, handleCheckClick,  showDeletDialog, showUpdateDialog }) => {
  function handleCheckTrueIsComplet() {
    handleCheckClick(note.id);
  }

  function handleUpdatClick() {
    showUpdateDialog();
  }

  function handleDeletClick() {
    showDeletDialog();
  }
  return (
    <div>
      <ul>
        <li style={{ marginTop: "5px" }}>{note.description}</li>
      </ul>
      <div className='buttonnotes'>
        {/* Delete */}
        <Button variant="contained" style={{ background: "red" }} onClick={handleDeletClick}>
          حذف
          <DeleteIcon style={{ paddingRight: "5px" }} />
        </Button>
        <Button variant="contained" style={{ background: "primary", marginRight: '10px' }} onClick={handleUpdatClick}>
          تعديل
          <EditIcon style={{ paddingRight: "5px" }} />
        </Button>
        {!note.isCompleted && (
          <Button
            variant="contained"
            style={{ background: "green", marginRight: '10px' }}
            onClick={handleCheckTrueIsComplet}
          >
            منجز
            <CheckCircleIcon style={{ paddingRight: "5px" }} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Ideas;