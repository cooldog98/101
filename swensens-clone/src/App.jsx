import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/bar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/register" element={<h1>register</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
