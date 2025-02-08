import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QAPage from './Components/Chatbot/QAPage';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<QAPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
