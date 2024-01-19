import './App.css';
import Signin from './Signin.js'
import "firebase/firestore";
import Navigate from './Navigate.js';
function App() {
  
  return (
    <div className="App">
      {<Navigate/>}
      {<Signin/>}
    </div>
  );
}

export default App;
