import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './components/Main/Main';
import SubmitPage from './components/Main/SubmitPage';
function App() {
  

  return (

    <Router basename='/revision_scheduler'>
      
      <Routes>
        <Route path="/submit" element={<SubmitPage></SubmitPage>}></Route>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
