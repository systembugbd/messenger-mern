import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messenger/login" element={<Login />} />
      <Route path="/messenger/register" element={<Register />} />
    </Routes>
  );
}

export default App;
