import Link from "next/link";
import { GetStaticProps } from "next";
import { getProducts } from "../services/productService";
import { Product } from "../types/product";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

type HomeProps = {
  products: Product[];
};

const Home = ({ products }: HomeProps) => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  ${product.price}
                </Typography>
                <Link href={`/products/${product.id}`} passHref>
                  <Button size="small" color="primary" variant="contained">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
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
