import './App.css';
import Notes from './Notes/Notes';
import { ToastProvider } from './Notes/context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <Notes />
      </div>
    </ToastProvider>
  );
}

export default App;
