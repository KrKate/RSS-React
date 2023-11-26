import styles from '../styles/Home.module.css';
import Header from '@/components/Header';
import Products from '@/components/Products';
import { ProductsProps } from '../types';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { Pagination } from '@/components/Pagination';
import Select from '@/components/Select';
import Aside from '@/components/Aside';

const Home = ({
  products,
  totalPages,
}: ProductsProps & { totalPages: number }) => {
  const [, setQuery] = useState('');
  const [asideVisible, setAsideVisible] = useState(false);

  const handleQuery = (query: string) => {
    setQuery(query);
  };

  const handleCloseAside = () => {
    setAsideVisible(false);
  };

  const handleOpenAside = () => {
    setAsideVisible(true);
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.wrapper}>
        <button>ErrorBoudary</button>
        <Header queryCallback={handleQuery}></Header>
        <Select></Select>
        <Pagination totalPages={totalPages}></Pagination>
        {products.length > 0 ? (
          <Products
            products={products}
            handleOpenAside={handleOpenAside}
          ></Products>
        ) : (
          <div className={styles.noProduct}>No such product found</div>
        )}
      </div>
      {asideVisible && <Aside onClose={handleCloseAside} />}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<
  ProductsProps & { totalPages: number }
> = async (context: GetServerSidePropsContext) => {
  const baseURL = 'https://dummyjson.com/products';
  const total = Number(context.query.total) || 100;
  const currentPage = Number(context.query.page) || 1;
  const limit = Number(context.query.limit) || 10;
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
      totalPages: Math.ceil(total / limit),
    },
  };
};
