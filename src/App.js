
import './App.css';
import Signup from './Signup.js'
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
function App() {
  
  return (
    <div className="App">
      {<Signup/>}
    </div>
  );
}

export default App;
