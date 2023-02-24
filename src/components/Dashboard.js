import PropTypes from 'prop-types';
import './Dashboard.css';

const Dashboard = ({ map, name, population }) => (
  <section className="dashboard">
    <img src={map} alt={name} className="dashboard-map" />
    <article className="title-container">
      <h2 className="page-title">{name}</h2>
      <span>{population}</span>
    </article>
  </section>
);

Dashboard.propTypes = {
  name: PropTypes.string,
  population: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  map: PropTypes.string,
};

Dashboard.defaultProps = {
  name: '',
  population: '',
  map: '',
};

export default Dashboard;
