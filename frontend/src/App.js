import './App.css';
import {Routes, Route} from "react-router-dom"
import SignupForm from "../src/components/SignupForm"
import Login from "../src/components/Login"

function App() {
  return (
    <div className="App">
        <h1>Notice Board</h1>
        <Routes>
          <Route path='/register' element = {<SignupForm/>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
         </Routes>
    </div>
   
  );
}

export default App;
