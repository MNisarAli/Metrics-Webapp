import PropTypes from 'prop-types';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

const Wrapper = ({ wrapper }) => {
  // Destructure the properties from the 'wrapper' object.
  const {
    name = '',
    population = '',
    map = '',
  } = wrapper;
  return (
    <>
      <div className="right-arrow">
        <HiOutlineArrowCircleRight />
      </div>
      <div className="content-wrapper">
        <img className="map" src={map} alt={name} />
        <div className="content">
          <h3 className="sub-heading">{name}</h3>
          {String(population)}
        </div>
      </div>
    </>
  );
};

Wrapper.propTypes = {
  // Validate the shape of the 'wrapper' object.
  wrapper: PropTypes.shape({
    name: PropTypes.string,
    population: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    map: PropTypes.string,
  }),
};

Wrapper.defaultProps = {
  wrapper: {
    name: '',
    population: '',
    map: '',
  },
};

export default Wrapper;
