import { GetStaticProps } from "next";
import { getProducts } from "../services/productService";
import { Product } from "../types/product";

type HomeProps = {
  products: Product[];
};

const Home = ({ products }: HomeProps) => {
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
};

export default Home;
