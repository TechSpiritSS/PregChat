import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import KomunicateChat from './components/chat/chat';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <KomunicateChat />
    </div>
  );
}

export default App;

