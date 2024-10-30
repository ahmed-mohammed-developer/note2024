import './App.css';
import Notes from './Notes/Notes'
import MySnakBar from './Notes/MySnakBar';
import { useState } from 'react';
import { ToastContext } from './Notes/context/ToastContext';
function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");


  function showHideToast(message){
    setOpen(true)
    setMessage(message)
    setTimeout(() => {
      setOpen(false)
    }, 5000)
  }

  return (
    <ToastContext.Provider value={{showHideToast}}>
    <div className="App">
      <MySnakBar open={open} message={message}/>
      <Notes />
    </div>
    </ToastContext.Provider>
  );
}

export default App;
