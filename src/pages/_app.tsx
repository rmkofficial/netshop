import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import "../styles/globals.css";
import Header from "../components/Header";
import { CartProvider } from "../context/CartContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </ThemeProvider>
  );
};

export default MyApp;
