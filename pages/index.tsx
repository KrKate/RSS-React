import styles from '../styles/Home.module.css';
import Header from '@/components/Header';
import Products from '@/components/Products';
import { ProductsProps } from '../types';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';

const Home = ({ products }: ProductsProps) => {
  const [, setQuery] = useState('');
  const handleQuery = (query: string) => {
    setQuery(query);
  };
  return (
    <div className={styles.wrapper}>
      <Header queryCallback={handleQuery}></Header>
      <Products products={products}></Products>
      <div>
        <button>Previous</button>
        <span>currentPage</span>
        <button>Next</button>
      </div>
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps<ProductsProps> = async (
  context: GetServerSidePropsContext
) => {
  const baseURL = 'https://dummyjson.com/products';
  const total = 100;
  const currentPage = Number(context.query.page) || 1;
  const limit = 20;
  const skip = (currentPage - 1) * limit;
  let url = `${baseURL}?total=${total}&skip=${skip}&limit=${limit}`;

  if (context.query.query) {
    const encodedQuery = encodeURIComponent(context.query.query as string);
    url = `${baseURL}/search?q=${encodedQuery}`;
  }
  const response = await fetch(url);
  const { products } = await response.json();
  return {
    props: {
      products,
    },
  };
};
