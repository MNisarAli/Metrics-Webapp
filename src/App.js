import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Continents from './pages/Continents';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import './App.css';

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" exact element={<Continents />} />
        <Route index path="/continent" element={<Countries />} />
        <Route index path="/country" element={<CountryDetails />} />
      </Routes>
    </main>
  </Router>
);

export default App;
