import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as JotaiProvider } from 'jotai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layout/Header';
import BottomBar from './layout/BottomBar';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Liderboard from './pages/liderboard/Liderboard';
import { CreateQuestion } from './pages/createQuestion';
import { useAuth } from './api/hooks/useAuth';
import ProtectedRoute from './guard/ProtectedRoute';
import PublicRoute from './guard/PublicRoute';

const queryClient = new QueryClient();

const App: React.FC = () => {
  useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/liderboard" element={<Liderboard />} />
            <Route path="/createQuestion" element={<CreateQuestion />} />
          </Route>
        </Routes>
      </main>
      <BottomBar />
      <ToastContainer />
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <Router>
        <App />
      </Router>
    </JotaiProvider>
  </QueryClientProvider>
);

export default AppWrapper;
