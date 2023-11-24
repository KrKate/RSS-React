import Products, { ProductsProps } from "@/components/Products";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";

export async function getStaticProps() {
  const total = 100;
  const skip = 0;
  const limit = 20;
  const response = await fetch(
    `https://dummyjson.com/products?total=${total}&skip=${skip}&limit=${limit}`,
  );
  const { products } = await response.json();
  return {
    props: {
      products,
    },
  };
}

const Page = ({ products }: ProductsProps) => (
  <div className={styles.wrapper}>
    <Header></Header>
    <Products products={products}></Products>
  </div>
);

export default Page;
