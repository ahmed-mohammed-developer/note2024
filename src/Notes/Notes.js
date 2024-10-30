import './Notes.css';
import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Ideas from './Ideas/Ideas';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const noteslist = [
  { id: uuidv4(), description: 'قراءة كتاب', isCompleted: false },
  { id: uuidv4(), description: 'مذاكرة الإنجليزي', isCompleted: false }
];

const Notes = () => {
  const [addnote, setAddnote] = useState(noteslist);
  const [descriptioninput, setDescriptioninput] = useState("");
  const [displayedNoteType, setdisplayedNoteType] = useState('all');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [noteIdToEdit, setNoteIdToEdit] = useState(null);
const [updatanote, setupdatanote] = useState("");
const [showUpdataAlert, setShowUpdataAlert] = useState(false);




  // دالة لمعالجة الضغط على زر الإنجاز
  const handleCheckClick = (ideasId) => {
    const updatedisCoplet = addnote.map((t) => {
      if (t.id === ideasId) {
        if (!t.isCompleted) {
          t.isCompleted = true;
        }
      }
      return t;
    });
    setAddnote(updatedisCoplet);
    localStorage.setItem("notesave", JSON.stringify(updatedisCoplet));
  };

  // دالة لمعالجة الضغط على زر الحذف
  function handleCheckClickDeleteConfrim(ideasId) {
    const updatedNotes = addnote.filter((t) => t.id !== ideasId);
    setAddnote(updatedNotes);
    localStorage.setItem("notesave", JSON.stringify(updatedNotes));
    setShowDeleteAlert(false);
  }

  // دالة لإغلاق الـDialog
  function handleClose() {
    setShowDeleteAlert(false);
  }

  // دالة لعرض الـDialog
  function showDeletDialog(noteId) {
    setNoteIdToDelete(noteId);
    setShowDeleteAlert(true);
  }
  
  function showUpdateDialog(noteId, currentDescription) {
    setNoteIdToEdit(noteId);
    setupdatanote(currentDescription);
    setShowUpdataAlert(true);
  }
  function handleUpdataClose() {
    setShowUpdataAlert(false);
  }
  function handleUpdateConfrim() {
    handleCheckClickUpdateConfrim(noteIdToEdit, updatanote);
    setShowUpdataAlert(false); // إغلاق `Dialog` بعد التحديث
  }
  
  
  // دالة لمعالجة الضغط على زر التعديل
  function handleCheckClickUpdateConfrim(ideasId, newDescription) {
    const updatedNotes = addnote.map((t) => {
      if (t.id === ideasId) {
        return { ...t, description: newDescription };
      }
      return t;
    });
    setAddnote(updatedNotes);
    localStorage.setItem("notesave", JSON.stringify(updatedNotes));
  }

  // دالة لإضافة ملاحظة جديدة
  const handleAddnote = () => {
    const newNote = {
      id: uuidv4(),
      description: descriptioninput,
      isCompleted: false
    };
    const updateednotesave = [...addnote, newNote];
    setAddnote(updateednotesave);
    localStorage.setItem("notesave", JSON.stringify(updateednotesave));
    setDescriptioninput("");
  };

  // مصفوفات التصفية
  const completedNote = useMemo(() => {
    return addnote.filter((n) => n.isCompleted);
  }, [addnote]);

  const noncompletedNote = useMemo(() => {
    return addnote.filter((n) => !n.isCompleted);
  }, [addnote]);

  let noteToBeRendered = addnote;
  if (displayedNoteType === "completed") {
    noteToBeRendered = completedNote;
  } else if (displayedNoteType === "non-completed") {
    noteToBeRendered = noncompletedNote;
  } else {
    noteToBeRendered = addnote;
  }

  // خريطة للمهام غير المنجزة
  const Ideasmap = noteToBeRendered
    .filter(n => !n.isCompleted)
    .map((n) => {
      return (
        <Ideas
        key={n.id}
        note={n}
        handleCheckClick={handleCheckClick}
        handleCheckClickDeleteConfrim={handleCheckClickDeleteConfrim}
        handleCheckClickUpdateConfrim={handleCheckClickUpdateConfrim}
        showDeletDialog={() => showDeletDialog(n.id)}
        showUpdateDialog={() => showUpdateDialog(n.id, n.description)}
      />
      
      
      );
    });

  // خريطة للمهام المنجزة
  const CompletedTasks = noteToBeRendered
    .filter(n => n.isCompleted)
    .map((n) => {
      return (
        <Ideas
  key={n.id}
  note={n}
  handleCheckClick={handleCheckClick}
  handleCheckClickDeleteConfrim={handleCheckClickDeleteConfrim}
  handleCheckClickUpdateConfrim={handleCheckClickUpdateConfrim}
  showDeletDialog={() => showDeletDialog(n.id)}
  showUpdateDialog={() => showUpdateDialog(n.id, n.description)}
/>

      
      );
    });

  // دالة لتغيير نوع المهام المعروضة
  function handleChangeType(event, newValue) {
    setdisplayedNoteType(newValue);
  }

  // استخدام تأثير لتحميل الملاحظات من التخزين المحلي عند تحميل المكون
  useEffect(() => {
    const storgNote = JSON.parse(localStorage.getItem("notesave"));
    setAddnote(storgNote);
  }, []);

  return (
    <div className='note'>
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
    <Button onClick={handleClose}>
      إلغاء
    </Button>
    <Button autoFocus style={{color: "red"}} onClick={() => handleCheckClickDeleteConfrim(noteIdToDelete)}>
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
    <Button type="submit" onClick={handleUpdateConfrim}>
      حفظ التعديل
    </Button>
  </DialogActions>
</Dialog>

      {/* Edit MODEL */}
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom className='titlenote'>
          قائمة المهام:
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={displayedNoteType}
          exclusive
          onChange={handleChangeType}
        >
          <ToggleButton value="all">جميع المهام</ToggleButton>
          <ToggleButton value="completed">المهام المنجزة</ToggleButton>
          <ToggleButton value="non-completed">المهام غير المنجزة</ToggleButton>
        </ToggleButtonGroup>
        {displayedNoteType === 'all' && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <div>
                <TextField
                  id="filled-multiline-static"
                  multiline
                  rows={4}
                  variant="filled"
                  fullWidth
                  className='rightsection'
                  value={descriptioninput}
                  onChange={(e) => {
                    setDescriptioninput(e.target.value);
                  }}
                />
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    style={{
                      background: '#fff',
                      color: 'black',
                      fontWeight: 400,
                      border: '1px solid black'
                    }}
                    onClick={handleAddnote}
                    disabled={descriptioninput.length === 0}
                  >
                    إضافة
                  </Button>
                </Stack>
              </div>
            </Grid>
          </Grid>
        )}
        {displayedNoteType === 'all' && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <div className="leftSection">
                  <h3>المهام غير المنجزة</h3>
                  {Ideasmap}
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <div className="checkSection">
                  <h3>المهام المنجزة</h3>
                  <ul>{CompletedTasks}</ul>
                </div>
              </Grid>
            </Grid>
          </>
        )}

        {displayedNoteType === 'completed' && (
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <div className="checkSection">
                <h3>المهام المنجزة</h3>
                <ul>{CompletedTasks}</ul>
              </div>
            </Grid>
          </Grid>
        )}

        {displayedNoteType === 'non-completed' && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <div className="leftSection">
                <h3>المهام غير المنجزة</h3>
                {Ideasmap}
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Notes;
