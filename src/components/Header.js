import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Header.css';
import { updateTitle } from '../redux/Title/titleReducer';

const Header = () => {
  // Initialize variables and hooks.
  const dispatch = useDispatch();
  const location = useLocation();
  const { title } = useSelector((state) => state.title);
  const year = new Date().getFullYear();

  // Update the title of the header based on the current page.
  useEffect(() => {
    let newHeading = '';

    switch (location.pathname) {
      case '/':
        newHeading = 'World Metrics';
        break;
      case '/continent':
        newHeading = 'Continent Details';
        break;
      case '/country':
        newHeading = 'Country Details';
        break;
      default:
        newHeading = 'Page Not Found';
        break;
    }

    dispatch(updateTitle(newHeading));
  }, [location, dispatch]);

  return (
    <header className="header" data-testid="header">
      <div className="nav-left">
        <h2 className="year" data-testid="year">{year}</h2>
      </div>
      <h1 className="title">{title}</h1>
      <div className="nav-right">
      </div>
    </header>
  );
};

export default Header;
