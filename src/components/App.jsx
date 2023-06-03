import { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class App extends Component {
  // static defaultProps = {
  //   initialContacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  // };

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
      name: '',
      number: '',
      filteredContacts: [],
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
    this.setState({ contacts: filteredContacts });

    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, name, number, filter } = this.state;
    return (
      <div
        style={{
          backgroundColor: 'rgb(148, 148, 148)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <ContactForm
          name={name}
          number={number}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          // filteredContacts={filteredContacts}
          contacts={contacts}
          filter={filter}
          handleContactDelete={this.handleContactDelete}
        />
      </div>
    );
  }
}

App.propTypes = {
  initialContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
