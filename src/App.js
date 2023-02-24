import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Continents from './pages/Continents';

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" exact element={<Continents />} />
      </Routes>
    </main>
  </Router>
);

export default App;
