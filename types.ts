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

export type Response = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type CardProps = {
  id: number;
  title: string;
  images: string[];
  price: number;
};
