import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getProducts } from "../../services/productService";
import { Product } from "../../types/product";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

type ProductDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h5" color="text.primary">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Typography>
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" onClick={() => router.back()}>
        Back to Products
      </Button>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();
  const paths = products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await getProducts();
  const product = products.find(
    (product: Product) => product.id.toString() === params?.id
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductDetail;
