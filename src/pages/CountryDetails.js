import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import './CountryDetails.css';

const CountryDetails = () => {
  // Get the location object from the react-router-dom.
  const location = useLocation();

  // Cache searchParams object using useMemo hook to avoid parsing URL parameters on every render.
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // Cache the country object using useMemo hook to avoid parsing JSON on every render.
  const country = useMemo(() => JSON.parse(searchParams.get('country') || '{}'), [searchParams]);

  // Extract the country object properties to use in the component.
  const {
    name, official, id, capital, subregion, region,
    population, lat, lng, area, flagSymbol, flag, map,
  } = country;

  return (
    <>
      <Dashboard
        map={map}
        name={name}
      />
      <section className="data-section">
        <h3 className="section-title">
          Country Details
        </h3>
        <article className="item-container">
          <div className="item">
            <span>Flag</span>
            <img className="flag" src={flag} alt="Country flag" />
          </div>
          <div className="item">
            <span>Flag Symbol</span>
            <span>{flagSymbol}</span>
          </div>
          <div className="item">
            <span>Official Name</span>
            <span>
              {official}
            </span>
          </div>
          <div className="item">
            <span>ID</span>
            <span>{id}</span>
          </div>
          <div className="item">
            <span>Capital</span>
            <span>{capital}</span>
          </div>
          <div className="item">
            <span>Region</span>
            <span>{region}</span>
          </div>
          <div className="item">
            <span>Sub-Region</span>
            <span>{subregion}</span>
          </div>
          <div className="item">
            <span>Population</span>
            <span>{population}</span>
          </div>
          <div className="item">
            <span>Area</span>
            <span>
              {area}
              sq. km
            </span>
          </div>
          <div className="item">
            <span>Latitude</span>
            <span>{lat}</span>
          </div>
          <div className="item">
            <span>Longitude</span>
            <span>{lng}</span>
          </div>
        </article>
      </section>
    </>
  );
};

export default CountryDetails;
