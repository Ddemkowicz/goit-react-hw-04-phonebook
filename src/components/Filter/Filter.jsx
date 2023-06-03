import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../AddContactFrom/AddContactFrom.module.css';

export default class Filter extends Component {
  render() {
    const { filter, handleFilterChange } = this.props;

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
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
