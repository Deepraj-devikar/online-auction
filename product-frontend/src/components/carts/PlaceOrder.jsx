import { Button, MenuItem, Paper, Select } from "@mui/material";
import './PlaceOrder.css';
import RoomIcon from '@mui/icons-material/Room';
import CartPlaceOrderBook from "../books/CartPlaceOrderBook";
import { connect } from "react-redux";

function PlaceOrder(props) {
    return(
        <div className="cart-placeorder-box">
            <Paper style={{
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #DCDCDC',
                borderRadius: '1px',
                opacity: 1
            }}>
                <div className="cart-place-order-content">
                    <div className="cart-place-order-title-n-location">
                        <div className="cart-place-order-title">
                            My Cart ({props.cartData.books.length})
                        </div>
                        <div className="cart-place-order-location">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={1}
                                size="small"
                            >
                                <MenuItem value={1}>
                                    <div className="cart-place-order-location-item">
                                        <RoomIcon />
                                        <div className="cart-place-order-location-item-text">
                                            BridgeLabz Solutions LLP, No...
                                        </div>
                                    </div>
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                    {
                        props.cartData.books.map(book => (
                            <CartPlaceOrderBook key={book._id} data={book} />
                        ))
                    }
                    <div className="cart-place-order-make-place-order-button" style={{
                        display: props.placeOrderGetSet == 1 ? 'visible' : 'none'
                    }}>
                        <Button variant="contained" onClick={() => props.countPlaceOrderGetSet(2)}>
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

export default connect(mapStateToProps) (PlaceOrder);