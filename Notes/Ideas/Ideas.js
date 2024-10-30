import React, {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';



const Ideas = ({note, handleCheckClick,  handleCheckClickDeleteConfrim,  handleCheckClickUpdateConfrim}) => {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [showUpdataAlert, setShowUpdataAlert] = useState(false)
    const [updatanote, setupdatanote] = useState(note.description)



    function handleCheckTrueIsComplet() {
        handleCheckClick(note.id)
    }
    //function Update
    function handleUpdataClose() {
      setShowUpdataAlert(false)
   }
   function handleUpdatClick() {
    setShowUpdataAlert(true)
 }

 function handleUpdateConfrim() {
  handleCheckClickUpdateConfrim(note.id, updatanote);
  setShowUpdataAlert(false); // إغلاق `Dialog` بعد التحديث
}
    //function Update
    function handleDeletClick() {
       setShowDeleteAlert(true)
    }
    function handleClose() {
        setShowDeleteAlert(false)
     }
     function handleDeleteConfrim(){
        handleCheckClickDeleteConfrim(note.id)
     }
  return (
    <div>
        {/* DELETE MODEL */}
        <Dialog
        onClose={handleClose}
        open={showDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل تريد حذف المهمة ؟"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleClose}
          >إلغاء</Button>
          <Button autoFocus style={{color: "red"}}
          onClick={handleDeleteConfrim}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
        {/* DELETE MODEL */}
        {/* Edit MODEL */}
        <Dialog
        onClose={handleUpdataClose}
        open={showUpdataAlert}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            name="text"
            type="text"
            fullWidth
            variant="standard"
            value={updatanote}
            onChange={(e) => {
              setupdatanote(e.target.value);
            }}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdataClose}>إلغاء</Button>
          <Button type="submit"
           onClick={handleUpdateConfrim}
          >حفظ التعديل</Button>
        </DialogActions>
      </Dialog>
        {/* Edit MODEL */}
       <ul>
        <li style={{marginTop: "5px"}}>{note.description}</li>
      </ul>
      <div className='buttonnotes'>
        {/* Dealet */}
      <Button variant="contained"
       style={{background: "red"}}
       onClick={handleDeletClick}
       >
        حذف
        <DeleteIcon  style={{paddingRight: "5px"}}/>
        {/* Dealet */}
      </Button>
      <Button variant="contained"
       style={{background: "primary" , marginRight: '10px'}}
       onClick={handleUpdatClick}
       >
        تعديل
        <EditIcon  style={{paddingRight: "5px"}}/>
      </Button>
      {/* is Complet */}
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
        {/* is Complet */}
      </div>
    </div>
  )
}

export default Ideas
