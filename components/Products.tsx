import Card from './Card';
import styles from '../styles/Products.module.css';
import { ProductsProps } from '../types';

const Products = ({ products }: ProductsProps) => {
  return (
    <div className={styles.products_container}>
      {products &&
        products.map(({ id, title, images }) => (
          <Card key={id} id={id} title={title} images={images} />
        ))}
    </div>
  );
};

export default Products;
