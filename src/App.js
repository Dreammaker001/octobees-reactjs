import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import AddPerson from './views/AddPerson';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
      <BrowserRouter>
        {/* <div className="App"> */}
          <header className="">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddPerson />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
          </header>
        {/* </div> */}
      </BrowserRouter>
  );
}

export default App;
