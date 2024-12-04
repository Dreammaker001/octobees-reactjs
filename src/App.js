import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import AddPerson from './views/AddPerson';

function App() {
  return (
      <BrowserRouter>
        {/* <div className="App"> */}
          <header className="App-header">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddPerson />} />
            </Routes>
          </header>
        {/* </div> */}
      </BrowserRouter>
  );
}

export default App;
