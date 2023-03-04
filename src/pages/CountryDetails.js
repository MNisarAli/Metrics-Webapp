import React, { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import './CountryDetails.css';
import { fetchAirPollution } from '../redux/Pollution/pollution';

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

  // Use the useDispatch hook to dispatch the fetchAirPollution AsyncThunk.
  const dispatch = useDispatch();

  // Use useCallback to memoize the fetchAirPollution action.
  const fetchPollutionData = useCallback(() => {
    dispatch(fetchAirPollution({ lat, lng }));
  }, [dispatch, lat, lng]);

  // Call the fetchPollutionData AsyncThunk when the component mounts.
  useEffect(() => {
    fetchPollutionData();
  }, [fetchPollutionData]);

  // Get the air pollution data from the Redux store.
  const pollutionData = useSelector((state) => state.airPollution.pollutionData);

  // Convert main.aqi value to a corresponding string value.
  const getAirQualityString = (aqi) => {
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      <Dashboard
        map={map}
        name={name}
      />
      <section className="data-section">
        <h3 className="article-heading">
          Country&apos;s Basic Info
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

        <h3 className="article-heading">
          Air Pollution Data
        </h3>
        <article className="item-container">
          {pollutionData?.list?.[0]?.components && (
          <>
            <div className="item">
              <span>Carbon monoxide (CO)</span>
              <span>
                {pollutionData.list[0].components.co}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <span>Nitrogen monoxide (NO)</span>
              <span>
                {pollutionData.list[0].components.no}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <span>
                Nitrogen dioxide (NO
                <sub>2</sub>
                )
              </span>
              <span>
                {pollutionData.list[0].components.no2}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <span>
                Ozone (O
                <sub>3</sub>
                )
              </span>
              <span>
                {pollutionData.list[0].components.o3}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <span>
                Sulphur dioxide (SO
                <sub>2</sub>
                )
              </span>
              <span>
                {pollutionData.list[0].components.so2}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <span>
                Fine particles matter (PM
                <sub>2.5</sub>
                )
              </span>
              <span>
                {pollutionData.list[0].components.pm2_5}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <span>
                Coarse particulate matter (PM
                <sub>10</sub>
                )
              </span>
              <span>
                {pollutionData.list[0].components.pm10}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <span>
                Ammonia (NH
                <sub>3</sub>
                )
              </span>
              <span>
                {pollutionData.list[0].components.nh3}
                {' '}
                μg/m³
              </span>
            </div>
            <div className="item">
              <strong>Air Quality Index</strong>
              <strong>
                {getAirQualityString(pollutionData.list[0].main.aqi)}
              </strong>
            </div>
          </>
          )}
        </article>
      </section>
    </>
  );
};

export default CountryDetails;
