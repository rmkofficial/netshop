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
  Box,
  CircularProgress,
} from "@mui/material";
import { slugify } from "../../utils/slugify";

type ProductDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: "50%" },
            objectFit: "contain",
            margin: "auto",
          }}
          image={product.image}
          alt={product.title}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Typography variant="h3" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h5" color="text.primary" paragraph>
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.back()}
          >
            Back to Products
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();
  const paths = products.map((product: Product) => ({
    params: { slug: slugify(product.title) },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await getProducts();
  const slug = params?.slug as string;
  const product = products.find(
    (product: Product) => slugify(product.title) === slug
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
