import React from 'react';
import styles from './ContactList.module.css';

const ContactList =  ({ contacts, onDeleteContact }) => (
    <ul className={styles.list}>
        {contacts.map( ({ id, name, number }) => (
            <li key={id} className={styles.item}>
                <p className={styles.name}>{name}: <span>{number}</span></p>
                <button type="button" className={styles.btn} onClick={()=> onDeleteContact(id)}>Delete</button>
            </li>
        ) )
        }
    </ul>
);


export default ContactList;