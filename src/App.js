import './App.css';
import "firebase/firestore";
import Navigate from './Navigate.js';
import { UsernameProvider } from './UsernameContext.js';
import { PlanNameProvider } from './UsernameContext.js';
function App() {
  
  return (
    <div className="App">
        <UsernameProvider>
        <PlanNameProvider>
      {<Navigate/>}
      </PlanNameProvider>
          </UsernameProvider>

    </div>
  );
}

export default App;
