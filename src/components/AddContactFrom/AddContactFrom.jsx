import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './AddContactFrom.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

export default class AddContactFrom extends Component {
  static defaultProps = {
    initialContacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      contacts: props.initialContacts,
      filter: '',
      name: '',
      number: '',
      filteredContacts: props.initialContacts,
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = e => {
    this.setState({ number: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (this.isNameAlreadyExists(name)) {
      alert(`"${name}" in already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    const contacts = [...this.state.contacts, newContact];
    const filteredContacts = this.getFilteredContacts(
      contacts,
      this.state.filter
    );
    this.setState({ contacts, filteredContacts, name: '', number: '' });
    this.resetForm();
  };

  isNameAlreadyExists = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  handleFilterChange = e => {
    const filter = e.target.value;
    const filteredContacts = this.getFilteredContacts(
      this.state.contacts,
      filter
    );
    this.setState({ filter, filteredContacts });
  };

  getFilteredContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleContactDelete = contactId => {
    const contacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    const filteredContacts = this.getFilteredContacts(
      contacts,
      this.state.filter
    );
    this.setState({ contacts, filteredContacts });
  };

  componentDidMount() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts(contacts, filter);
    this.setState({ filteredContacts });
  }

  render() {
    const { filteredContacts, name, number, filter } = this.state;

    return (
      <div className={css.addContactFrom}>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          handleFormSubmit={this.handleFormSubmit}
        />

        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          filteredContacts={filteredContacts}
          handleContactDelete={this.handleContactDelete}
        />
      </div>
    );
  }
}

AddContactFrom.propTypes = {
  initialContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
