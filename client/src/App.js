import './App.css';
import Navbar from './components/Navbar';
import Adminscreen from './screens/Adminscreen';
import Bookingscreen from './screens/Bookingscreen';
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Registerscreen from './screens/Registerscreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen/>} />
          <Route path='/profile' exact element={<Profilescreen/>} />
          <Route path="/admin" element={<Adminscreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
