import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import './App.css';

import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';

class App extends Component {
    static defaultProps = {
    totalContactsCount: null,
    visibleContacts: null,
  }
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape(
        {
          id: PropTypes.any.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        })
    ),
    filter: PropTypes.string,
    totalContactsCount: PropTypes.number,
    visibleContacts: PropTypes.number,
  };
  state = {
    contacts: [
      {id: 'id-1', name: 'Margo Robins', number: '093-144-15-14'},
      {id: 'id-2', name: 'Damon Crunk', number: '095-111-12-23'},
      {id: 'id-3', name: 'Paulo Swit ', number: '078-137-22-79'},
      {id: 'id-4', name: 'Mango Candy', number: '050-932-15-26'},
    ],
    filter: '',
  };

  addContact = (name, number) => {
 
    if (this.state.contacts.find((contact) => name.toLowerCase() === contact.name.toLocaleLowerCase()))
    {
      alert(`${name} is already in contacts.`); return;
    } else if (name && number) {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      alert (`Please enter a name for contact ${name}!`)
    }
  };

  deleteContact = (contactId => {
    this.setState( prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)}))
    }
  );

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value })
  }

  render() {
    const { contacts, filter } = this.state;
    const totalContactsCount = contacts.length;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onAddContact={this.addContact} />

        <h2>Contacts (total: {totalContactsCount}) </h2>
        <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>        
    );
  }  
}

export default App;
