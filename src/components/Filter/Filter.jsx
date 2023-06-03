import css from './Filter.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => {
  const { filter, handleFilterChange } = props;

  return (
    <>
      <h3>Filter</h3>
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search contacts"
      />
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
