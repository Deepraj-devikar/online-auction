import Container from "@mui/material/Container";
import Header from "../../components/header/Header";
import './Cart.css';
import CartPage from "../../components/carts/CartPage";
import Footer from "../../components/footer/Footer";

export default function Cart(props) {
    return (
        <div className="main-cart-page">
            <Header />
            <Container>
                <CartPage />
            </Container>
            <Footer />
        </div>
    );
}
