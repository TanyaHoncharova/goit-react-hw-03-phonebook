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
          number: PropTypes.number.isRequired,
        })
    ),
    filter: PropTypes.string,
    totalContactsCount: PropTypes.number,
    visibleContacts: PropTypes.number,
  };
  state = {
    contacts: [ ],
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

  componentDidMount() {
    // если нужно прочитать из localStorege при первой загрузке и отрисовать, то что там сохранилось, усли state пусто

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts:parsedContacts})
    };

    // отрисовка контактов при первом рендере из state или localStorege, если он отличается от state
    // const contacts = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contacts);
    // if (parsedContacts && parsedContacts !== this.state.contacts) {
    //   this.setState({ contacts: parsedContacts });
    // }
  }



  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    
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
