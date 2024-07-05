import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import { useCartTotalCount } from "../context/CartContext";

const Header = () => {
  const router = useRouter();
  const totalItems = useCartTotalCount();

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleTitleClick = () => {
    router.push("/");
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button
            color="inherit"
            onClick={handleTitleClick}
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h6" component="div">
              NetShop
            </Typography>
          </Button>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
