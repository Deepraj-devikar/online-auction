import { Button, Paper } from "@mui/material";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { CART_DATA } from "../../redux/constants";
import { GetCartApi, PurchaseApi } from "../../services/DataService";
import CartOrderSummeryBook from "../books/CartOrderSummeryBook";
import './OrderSummery.css';

function OrderSummery(props) {
    const navigate = useNavigate();

    const setUpCart = () => {
        GetCartApi()
        .then(response => {
            props.dispatch({
                type: CART_DATA,
                cartData: response.data.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    const placeOrderClickHandler = () => {
        PurchaseApi()
        .then(response => {
            console.log("Purchase api ", response);
            if(response.status == 202) {
                setUpCart();     
                navigate('/order');
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="cart-order-summery-box">
            <Paper style={{
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #DCDCDC',
                borderRadius: '1px',
                opacity: 1
            }}>
                <div className="cart-order-summery-content">
                    <div className="cart-order-summery-title">
                        Order summery
                    </div>
                    {
                        props.cartData.books.map(book => (
                            <CartOrderSummeryBook key={book.productID} data={book} />
                        ))
                    }
                    <div className="cart-order-summery-checkout-button" style={{
                        display: props.placeOrderGetSet == 3 ? 'visible' : 'none'
                    }}>
                        <Button variant="contained" onClick={placeOrderClickHandler}>
                            PLACE ORDER
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cartData: state.CartReducer.cartData
    }
}

export default connect(mapStateToProps) (OrderSummery);