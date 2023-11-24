import Card from "./Card";
import styles from "../styles/Products.module.css";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductsProps = {
  products: Product[];
};

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
