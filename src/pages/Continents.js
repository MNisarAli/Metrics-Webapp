import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getContinents } from '../redux/Continent/continentsSlice';
import Dashboard from '../components/Dashboard';
import Wrapper from '../components/Wrapper';

const Continents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { continents, status } = useSelector((state) => state.continents);

  useEffect(() => {
    // Fetch continents data from API only when it is not already available.
    if (continents.length === 0) {
      dispatch(getContinents());
    }
  }, [continents, dispatch]);

  // Show loading message when data is being fetched.
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Calculate total population of all continents.
  const totalPopulation = continents.reduce((acc, obj) => acc + obj.population, 0);

  const worldMap = 'https://svgsilh.com/svg/306338.svg';

  // Handle click event when a continent is clicked
  const handleContinentClick = (continent) => {
    navigate(`/continent?continent=${JSON.stringify(continent)}`);
  };

  return (
    <>
      {/* Show dashboard with world map and total population */}
      <Dashboard map={worldMap} name="World" population={totalPopulation} />

      <section className="data-section">
        <h3 className="section-title">Continents</h3>
        <nav className="navbar">
          {/* Iterate over continents array and display each continent using Wrapper component */}
          {continents.map((continent) => (
            <a
              className="nav-item"
              key={continent.id}
              href={continent.path}
              onClick={(e) => {
                e.preventDefault();
                handleContinentClick(continent);
              }}
            >
              <Wrapper wrapper={continent} />
            </a>
          ))}
        </nav>
      </section>
    </>
  );
};

export default Continents;
