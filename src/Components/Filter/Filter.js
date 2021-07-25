import React, { Component } from 'react';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
    <label className={styles.label}>
        Find contacts by name
        <input className={styles.input} type="text" value={value} onChange={onChange}/>
    </label>
);

export default Filter;