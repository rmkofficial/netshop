import React from "react";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("../components/Cart"), {
  loading: () => <p>Loading...</p>,
});

const CartPage = () => (
  <div>
    <Cart />
  </div>
);

export default CartPage;
