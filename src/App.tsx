import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Header from './layout/Header';
import BottomBar from './layout/BottomBar';
import Profile from './pages/profile/Profile';
import Liderboard from './pages/liderboard/Liderboard';
import { CreateQuestion } from './pages/createQuestion';

const App: React.FC = () => {
  return (
    <div className="app-container flex min-h-screen flex-col">
      <Header />
      <main className={'flex-1 p-4'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liderboard" element={<Liderboard />} />
          <Route path="/createQuestion" element={<CreateQuestion />} />
        </Routes>
      </main>
      <BottomBar />
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
