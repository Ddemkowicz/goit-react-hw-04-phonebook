import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactList extends Component {
  handleDeleteClick = contactId => {
    const { handleContactDelete } = this.props;
    handleContactDelete(contactId);
  };

  render() {
    const { contacts } = this.props;

    return (
      <>
        <h2>Contacts</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              {contact.name} : {contact.number}
              <button
                onClick={() => this.handleDeleteClick(contact.id)}
                type="button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleContactDelete: PropTypes.func.isRequired,
};
