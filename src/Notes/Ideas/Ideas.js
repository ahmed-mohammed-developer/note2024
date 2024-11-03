import React, {useContext} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ToastContext } from '../context/ToastContext';

const Ideas = ({ note, handleCheckClick, showDeletDialog, showUpdateDialog }) => {
  const { showHideToast } = useContext(ToastContext);

  function handleCheckTrueIsComplet() {
    handleCheckClick(note.id);
    showHideToast("تم الإضافة إلى المهام المنجزة بنجاح");
  }

  function handleUpdatClick() {
    showUpdateDialog();
  }

  function handleDeletClick() {
    showDeletDialog();
  }

  return (
    <div className='boxshado'>
      <ul>
        <li style={{ marginTop: "5px" }}>{note.description}</li>
      </ul>
      <div className='buttonnotes'>
        {/* Delete Icon */}
        <DeleteIcon
          onClick={handleDeletClick}
          style={{ color: "red", cursor: "pointer", marginRight: "10px" }}
          className='buttonideasicon'
        />
        {/* Edit Icon */}
        <EditIcon
          onClick={handleUpdatClick}
          style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
          className='buttonideasicon'
        />
        {/* Complete Icon */}
        {!note.isCompleted && (
          <CheckCircleIcon
            onClick={handleCheckTrueIsComplet}
            style={{ color: "green", cursor: "pointer", marginRight: "10px" }}
            className='buttonideasicon'
          />
        )}
      </div>
    </div>
  );
}

export default Ideas;
