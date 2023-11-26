import styles from '../styles/Card.module.css';
import { CardProps } from '../types';

const Card = ({
  id,
  title,
  images,
  price,
  onCardClick,
}: CardProps & { onCardClick: () => void }) => {
  const handleClick = () => {
    onCardClick();
  };

  return (
    <div key={id} onClick={handleClick}>
      <div className={styles.card_wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <img className={styles.img} src={images[0]} alt={title} />
        <div className={styles.price}>{price}$</div>
      </div>
    </div>
  );
};

export default Card;
