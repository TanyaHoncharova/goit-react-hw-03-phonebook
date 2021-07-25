import React, { Component } from 'react';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = (event) => {
        this.setState({[event.currentTarget.name]: event.currentTarget.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onAddContact(this.state.name, this.state.number);
        this.setState({ name: '', number: '' });
    }

    render() {
        return(
            <form className={styles.form} >
                <label className={styles.label}>Name: 
                    <input type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п." 
                    className={styles.input}
                    value={this.state.name}
                    onChange={this.handleChange}
                    required />
                </label>
                <label className={styles.label}>Number: 
                    <input type="tel" name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    className={styles.input} value={this.state.number} onChange={this.handleChange} required />
                </label>
                <button type="button" 
                className={styles.btn} onClick={this.handleSubmit}>
                    Add contact
                </button>
            </form>
        )
    }
}

export default ContactForm;