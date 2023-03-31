import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import './App.css';
// import KomunicateChat from './components/chat/chat';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <iframe
        allow="microphone;"
        // width="350"
        // height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/74bfde5e-3d3e-46aa-b30c-d9b382eaf25c"
      ></iframe>
    </div>
  );
}

export default App;

