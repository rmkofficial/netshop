import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { state, dispatch } = useCart();

  const handleAddQuantity = (id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", id });
  };

  const handleRemoveQuantity = (id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", id });
  };

  const handleDeleteItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const getTotalPrice = () => {
    return state.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {state.items.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ListItemText primary={item.title} secondary={`$${item.price}`} />
            <Box>
              <IconButton onClick={() => handleRemoveQuantity(item.id)}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                {item.quantity}
              </Typography>
              <IconButton onClick={() => handleAddQuantity(item.id)}>
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteItem(item.id)}
                sx={{ ml: 2 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Typography variant="h5">Total: ${getTotalPrice()}</Typography>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;