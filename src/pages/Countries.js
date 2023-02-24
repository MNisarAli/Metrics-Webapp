import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCountries } from '../redux/Country/countriesSlice';
import Dashboard from '../components/Dashboard';
import Wrapper from '../components/Wrapper';

const Countries = () => {
  // hooks for accessing routing and state management functionality.
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // parse the query params to get the continent info.
  const continent = JSON.parse(searchParams.get('continent') || '{}');

  // destructure the continent info.
  const {
    region, map, population, name, noOfCountries,
  } = continent;

  // get countries and status from the store.
  const { countries, status } = useSelector((state) => state.countries);

  // state for search term.
  const [searchTerm, setSearchTerm] = useState('');

  // fetch countries based on the continent info.
  useEffect(() => {
    const fetchCountries = async () => {
      dispatch(getCountries({ region, name }));
    };

    // fetch countries only if they are not already present or if the region/name has changed.
    if (
      countries.length === 0
      || region !== countries[0].region
      || name !== countries[0].continent
    ) {
      fetchCountries();
    }
  }, [name, region, countries, dispatch]);

  // handler for clicking on a country.
  const handleCountryClick = (country) => {
    navigate(`/country?country=${JSON.stringify(country)}`);
  };

  // handler for updating the search term.
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // memoized array of filtered countries based on the search term.
  const filteredCountries = useMemo(() => countries.filter(
    (country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  ), [countries, searchTerm]);

  // show loading message if countries are still loading.
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dashboard
        map={map}
        name={name}
        population={population}
      />
      <section className="data-section">
        <article className="search-wrapper">
          <h3 className="section-title">
            {noOfCountries}
            <span> Countries</span>
          </h3>
          <form>
            <input
              type="text"
              placeholder="Search country by name"
              className="search-input"
              onChange={handleSearch}
            />
          </form>
        </article>
        <nav className="navbar">
          {filteredCountries.map((country) => (
            <a
              className="nav-item"
              key={country.id}
              href={country.path}
              onClick={(e) => {
                e.preventDefault();
                handleCountryClick(country);
              }}
            >
              <Wrapper wrapper={country} />
            </a>
          ))}
        </nav>
      </section>
    </>
  );
};

export default Countries;
