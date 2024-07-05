import Link from "next/link";
import { useRouter } from "next/router";
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
  Box,
} from "@mui/material";
import { slugify } from "../utils/slugify";

type HomeProps = {
  products: Product[];
};

const Home = ({ products }: HomeProps) => {
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom align="center">
        Product List
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleCardClick(slugify(product.title))}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", marginTop: 2 }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                </Box>
                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    ${product.price}
                  </Typography>
                  <Link href={`/products/${slugify(product.title)}`} passHref>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                    </Button>
                  </Link>
                </Box>
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
