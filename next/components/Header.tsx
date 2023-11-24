import { NextPage } from 'next/types';
import styles from '../styles/Header.module.css';

const Header: NextPage = () => (
  <div className={styles.header}>
    <input
      className={styles.search_input}
      type="text"
      placeholder="Input product"
    ></input>
    <button className={styles.search_button}>Search</button>
  </div>
);

export default Header;
