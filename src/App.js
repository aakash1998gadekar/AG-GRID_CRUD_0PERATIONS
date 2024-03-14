import './App.css';
import UI from './components/UI';
const data = require("../src/student.json");



function App() {
  
  return (

    <div className="App">
      <UI data={data}/>
    </div>
  );
}

export default App;
