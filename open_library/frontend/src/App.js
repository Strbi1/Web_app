import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import Reservations from './pages/Reservations';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/books' element={<BookList />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/reservations' element={<Reservations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;