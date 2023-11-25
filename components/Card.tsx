import Link from 'next/link';
import styles from '../styles/Card.module.css';
import { CardProps } from '../types';

const Card = ({ id, title, images }: CardProps) => {
  return (
    <div key={id}>
      <Link className={styles.card_wrapper} href={`/details/${title}`}>
        <h1 className={styles.title}> {title}</h1>
        <img className={styles.img} src={images[0]} alt={title} />
      </Link>
    </div>
  );
};

export default Card;
