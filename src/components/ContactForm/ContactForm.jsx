import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../AddContactFrom/AddContactFrom.module.css';

export default class ContactForm extends Component {
  render() {
    const {
      name,
      number,
      handleNameChange,
      handleNumberChange,
      handleFormSubmit,
    } = this.props;

    return (
      <form onSubmit={handleFormSubmit}>
        <h1>Phonebook</h1>
        <div className={css.addContactFrom}>
          <label className={css.label}>Name: </label>
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label className={css.label}>Number: </label>
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleNumberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button className={css.button} type="submit">
            Add Contact
          </button>
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
